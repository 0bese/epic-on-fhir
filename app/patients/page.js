"use client";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

function Patients() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [patientData, setPatientData] = useState(null);
  const [loading, setLoading] = useState(true);

  async function getData(code) {
    try {
      const response = await fetch(
        `http://localhost:3000/api/oauth/epic/redirect?code=${code}`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();

      // Store data in localStorage and state
      localStorage.setItem("patientData", JSON.stringify(data));
      setPatientData(data);

      // Remove code from URL after successful data fetch
      const newUrl = window.location.pathname;
      router.replace(newUrl);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    // First check localStorage for existing data
    const storedData = localStorage.getItem("patientData");
    if (storedData) {
      setPatientData(JSON.parse(storedData));
      setLoading(false);
      return;
    }

    // If no stored data, check for code parameter
    const codeParam = searchParams.get("code");
    if (codeParam) {
      getData(codeParam);
    } else {
      setLoading(false);
    }
  }, [searchParams]);

  const clearData = () => {
    localStorage.removeItem("patientData");
    setPatientData(null);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-lg">Loading patient data...</p>
      </div>
    );
  }

  if (!patientData) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>No Patient Data</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="mb-4">Please authenticate to view patient data</p>
            <Link
              href="/"
              className="inline-block px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
            >
              Go to Authentication
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            <span>Patient Information</span>
            <button
              onClick={clearData}
              className="px-4 py-2 text-sm bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
            >
              Clear Data
            </button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-lg">
              <span className="font-semibold">Name:</span>{" "}
              {patientData.name?.[0]?.given?.join(" ")}{" "}
              {patientData.name?.[0]?.family}
            </p>
            <p>
              <span className="font-semibold">Birth Date:</span>{" "}
              {patientData.birthDate}
            </p>
            <p>
              <span className="font-semibold">Gender:</span>{" "}
              {patientData.gender}
            </p>
            {patientData.address && patientData.address[0] && (
              <div>
                <p className="font-semibold">Address:</p>
                <p>{patientData.address[0].line?.join(", ")}</p>
                <p>
                  {patientData.address[0].city}, {patientData.address[0].state}{" "}
                  {patientData.address[0].postalCode}
                </p>
              </div>
            )}
            {patientData.telecom && (
              <div>
                <p className="font-semibold">Contact Information:</p>
                {patientData.telecom.map((contact, index) => (
                  <p key={index}>
                    {contact.system}: {contact.value}
                  </p>
                ))}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default Patients;
