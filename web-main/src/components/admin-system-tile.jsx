import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { useSystems } from "@/contexts/systems-provider";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";

import { Cog } from "lucide-react";

const templateSystem = {
  type: "salesforce",
  status: {
    enabled: true,
    overall: "Ready",
  },
  description: "Streamline development, collaborate, and review code.",
};

export const AdminSystemTile = ({ system = templateSystem }) => {
  const { selectSystem } = useSystems();

  const handleClick = (system_id) => {
    selectSystem(system_id);
  };

  return (
    <Card className="w-64 rounded-sm h-60">
      <CardHeader className="flex flex-row justify-between w-full align-middle">
        <div className="w-12 h-12 flex align-middle items-center">
          <img src={"/images/systems/" + system.type + ".svg"} />
        </div>
        <Badge
          variant="muted"
          className="h-4 flex self-center rounded-full px-4 py-3 border-0 bg-ready text-ready-foreground"
        >
          {system.status.overall}
        </Badge>
      </CardHeader>
      <CardTitle className="text-primary text-md px-4 pb-2">
        {system.type}
      </CardTitle>
      <CardDescription className="px-4">
        Connect {system.type} to create connections in your data.
      </CardDescription>
      <CardFooter className="flex flex-row justify-between p-4">
        <Button variant="outline" onClick={() => handleClick(system.id)}>
          <Cog />
          Settings
        </Button>
        <Switch checked={system.status.data === "connected"} disabled></Switch>
      </CardFooter>
    </Card>
  );
};
