import { useTheme } from "@/contexts/ThemeContext";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

type ButtonItem = {
  text: string;
  path: string;
};

const NavigateButtons = () => {
  const { theme } = useTheme();
  const router = useRouter();

  const buttonItem: ButtonItem[] = [
    {
      text: "Category",
      path: "",
    },
    {
      text: "Quote",
      path: "",
    },
  ];

  const handleNavigate = (path: string) => {
    router.push(`/${path}`);
  };

  return (
    <div>
      {buttonItem.map((item) => {
        return (
          <Button
            key={item.text}
            className={`cursor-pointer font-semibold ${
              theme === "dark"
                ? "text-white hover:text-[var(--primary)]"
                : "text-black hover:text-[var(--primary)]"
            }`}
            onClick={() => handleNavigate(item.path)}
          >
            {item.text}
          </Button>
        );
      })}
    </div>
  );
};

export default NavigateButtons;
