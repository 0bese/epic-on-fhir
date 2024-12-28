import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

export function LoginForm({ className, ...props }) {
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl"> SMART on FHIR App</CardTitle>
          <CardDescription>Auth through EPIC</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-2">
            <form action="/api/oauth/epic/authorize" method="get">
              <div className="flex flex-col gap-4 mb-4">
                <Label className="text-lg "> Username: fhircamila</Label>
                <Label className="text-lg "> Password: epicepic1</Label>
              </div>
              <Button type="submit" className="w-full">
                Authorize
              </Button>
            </form>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
