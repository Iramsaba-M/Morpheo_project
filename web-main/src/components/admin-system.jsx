import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { useSystems } from "@/contexts/systems-provider";
import { CircleX } from "lucide-react";

export const AdminSystem = () => {
  const { system, dismissSystem, trainSystem, removeSystem } = useSystems();

  const handleTraining = (system_id) => {
    trainSystem(system_id);
    dismissSystem(system_id);
  };

  const handleDelete = (system_id) => {
    removeSystem(system_id);
    dismissSystem(system_id);
  };

  return (
    <div className="flex flex-col gap-4 p-4 items-center">
      <div className="flex flex-row justify-between w-full">
        <div className="flex items-center gap-6">
          <img
            src={"/images/systems/" + system.type + ".svg"}
            className="w-20"
          />
          <img src="/arrow.svg" className="w-14" />
          <img src="morpheo-small.svg" className="h-20" />
        </div>
        <Badge
          variant="muted"
          className="h-4 flex self-center rounded-full px-4 py-3 border-0 bg-ready text-ready-foreground"
        >
          {system.status.overall}
        </Badge>
      </div>
      <div className="flex flex-col gap-4">
        <Card className="flex bg-accent rounded-sm border-0 p-6">
          <CardHeader className="p-0">
            <CardTitle className="text-primary, text-xs">
              Data Source Credentials
            </CardTitle>
            <CardDescription>
              Credentials are the login details, like API keys, tokens, or
              database passwords, that let our system securely connect to your
              data sources. They ensure we can fetch, process, and deliver your
              data while keeping everything safe and secure.
            </CardDescription>
          </CardHeader>
        </Card>
        <div className="grid auto-rows-min gap-4 md:grid-cols-2">
          <Card className="flex rounded-sm border-1 py-6 px-5">
            <CardHeader className="p-0">
              <CardTitle className="text-primary, text-xs">
                Data Connection Status
              </CardTitle>
              <CardDescription className="text-xl font-bold">
                {system.status.data}
              </CardDescription>
            </CardHeader>
          </Card>
          <Card className="flex rounded-sm border-1 py-6 px-5">
            <CardHeader className="p-0">
              <CardTitle className="text-primary, text-sm">
                Training Status
              </CardTitle>
              <CardDescription className="text-xl font-bold">
                {system.status.training}
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
        <Card className="flex flex-col rounded-sm border-1 py-6 px-5">
          <CardHeader className="p-0">
            <CardTitle className="text-primary, text-sm">
              Data Source Details
            </CardTitle>
            <CardDescription>{system.description}</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col p-0 pt-6">
            <form>
              <div className="grid w-full items-center gap-4">
                {system.fields.map((field) => (
                  <div key={field.name} className="grid gap-2">
                    <Label htmlFor={field.name}>{field.name}</Label>
                    <Input
                      id={field.name}
                      type={field.type}
                      placeholder={field.placeholder}
                      value={field.value}
                      required
                    />
                  </div>
                ))}
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex flex-row justify-between p-0 pt-6">
            <div className="flex flex-row gap-2">
              <Button variant="outline" onClick={() => dismissSystem()}>
                Cancel
              </Button>
              <Button variant="outline" onClick={() => handleDelete(system.id)}>
                <CircleX />
                Remove
              </Button>
            </div>
            <div className="flex flex-row gap-2">
              <Button onClick={() => handleTraining(system.id)}>
                Initiate Training
              </Button>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};
