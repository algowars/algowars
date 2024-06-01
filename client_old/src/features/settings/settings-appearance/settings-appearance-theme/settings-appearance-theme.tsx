import Loader from "@/components/loader/loader";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import ThemeToggle from "@/features/theme/theme-toggle/theme-toggle";
import { useTheme } from "@/features/theme/theme.provider";
import { themes } from "@/features/theme/themes"; // Ensure this is the transformed object.

const SettingsAppearanceTheme = () => {
  const { theme, setTheme } = useTheme();

  const changeTheme = (themeName: string) => {
    const foundTheme = themes[themeName];

    if (foundTheme) {
      setTheme(foundTheme);
    }
  };

  return (
    <article className="flex flex-col gap-4">
      <div>
        <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
          Customize
        </h4>
        <p className="text-sm text-muted-foreground">
          Pick a style and color for your components.
        </p>
      </div>
      <div className="grid grid-cols-3 max-w-md gap-3">
        {Object.entries(themes).map(([key, value]) => (
          <Button
            key={key}
            variant={theme.name === value.name ? "secondary" : "outline"}
            onClick={() => changeTheme(value.name)}
            style={
              {
                "--theme-primary": `hsl(${value.style.root.primary})`,
              } as React.CSSProperties
            }
          >
            <span
              className={`mr-1 flex h-5 w-5 shrink-0 -translate-x-1 items-center justify-center rounded-full bg-[var(--theme-primary)]`}
            ></span>
            {value.name}
          </Button>
        ))}
      </div>
      <div>
        <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
          Examples
        </h4>
        <p className="text-muted-foreground">
          Example components based on the current theme
        </p>
      </div>
      <div className="flex gap-10 items-center">
        <Button>Example</Button>
        <Loader className="w-fit" />
        <Switch />
        <Slider />
      </div>
      <ThemeToggle />
    </article>
  );
};

export default SettingsAppearanceTheme;
