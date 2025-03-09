import Layout from "@/components/layout/Layout";
import Card from "@/components/ui-elements/Card";
import PageTitle from "@/components/ui-elements/PageTitle";
import { Button } from "@/components/ui/button";
import { Bell, Palette, Settings2, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";

const SettingsLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <Layout>
      <div className="mb-6">
        <PageTitle
          title="Settings"
          description="Manage your application preferences"
        />
      </div>
      <Card className="mb-4">
        <div className="flex gap-2">
          {navButtons.map((button, index) => (
            <Button key={index} variant="outline" className="w-full">
              <Link
                to={button.url}
                className="flex justify-center w-full items-center gap-2"
              >
                {button.Icon} {button.label}
              </Link>
            </Button>
          ))}
        </div>
      </Card>
      {children}
    </Layout>
  );
};

export default SettingsLayout;

const navButtons: {
  label: string;
  url: string;
  Icon: React.ReactNode;
}[] = [
  {
    label: "Appearance",
    url: "/settings/appearance",
    Icon: <Palette size={16} />,
  },
  {
    label: "Notifications",
    url: "/settings/notifications",
    Icon: <Bell size={16} />,
  },
  {
    label: "Security",
    url: "/settings/security",
    Icon: <ShieldCheck size={16} />,
  },
  {
    label: "System",
    url: "/settings/system",
    Icon: <Settings2 size={16} />,
  },
];
