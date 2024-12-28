import { NextResponse } from "next/server";
import { EPIC, EPIC_ENDPOINTS, EPIC_OAUTH_BASE } from "@/constants/server/epic";
import axios, { HttpStatusCode } from "axios";

export async function GET(req, { params }) {
  try {
    const { action } = await params;

    switch (action) {
      case EPIC.OAUTH_ACTIONS.AUTHORIZE:
        try {
          const oauthUrl = EPIC_ENDPOINTS.OAUTH.AUTHORIZE({
            response_type: "code",
            state: req.nextUrl.searchParams.get("state") || 1234,
            aud: EPIC_OAUTH_BASE,
            client_id: process.env.EPIC_CLIENT_ID,
            scope: "patient/.read",
            redirect_uri: `${process.env.EPIC_REDIRECT_URI}`,
          });
          console.log(`Authorization URL generated: ${oauthUrl}`);
          return NextResponse.redirect(oauthUrl);
        } catch (error) {
          console.error("Error in authorization:", error);
          return NextResponse.json(
            { message: "Authorization failed" },
            { status: HttpStatusCode.BadRequest }
          );
        }

      case EPIC.OAUTH_ACTIONS.REDIRECT:
        try {
          const payload = {
            client_id: process.env.EPIC_CLIENT_ID,
            redirect_uri: `${process.env.EPIC_REDIRECT_URI}`,
            grant_type: "authorization_code",
            code: req.nextUrl.searchParams.get("code"),
          };

          // Get access token
          const tokenResponse = await axios.post(
            EPIC_ENDPOINTS.OAUTH.TOKEN,
            payload,
            {
              headers: {
                "Content-Type": "application/x-www-form-urlencoded",
              },
            }
          );

          if (!tokenResponse.data.access_token) {
            throw new Error("Failed to obtain access token");
          }

          // Get patient data
          const patientData = await axios.get(
            `https://fhir.epic.com/interconnect-fhir-oauth/api/FHIR/R4/Patient/${tokenResponse.data.patient}`,
            {
              headers: {
                Authorization: `Bearer ${tokenResponse.data.access_token}`,
              },
            }
          );

          return NextResponse.json(patientData.data);
        } catch (error) {
          console.error("Error in redirect handler:", error);
          const status =
            error.response?.status || HttpStatusCode.InternalServerError;
          const message =
            error.response?.data?.message || "Failed to process redirect";
          return NextResponse.json({ message }, { status });
        }

      default:
        return NextResponse.json(
          { message: "Invalid request" },
          { status: HttpStatusCode.BadRequest }
        );
    }
  } catch (error) {
    console.error("Critical error:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: HttpStatusCode.InternalServerError }
    );
  }
}
