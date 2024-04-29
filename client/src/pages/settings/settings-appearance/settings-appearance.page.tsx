import SettingsAppearance from "@/features/settings/settings-appearance/settings-appearance";

const SettingsAppearancePage = () => {
  return (
    <div>
      <header>
        <h4 className="text-lg font-medium tracking-light">Appearance</h4>
        <p className="text-sm text-muted-foreground">
          Customize the appearance of the app. Automatically switch between day
          and night themes.
        </p>
      </header>
      <div
        data-orientation="horizontal"
        role="none"
        className="shrink-0 bg-border h-[1px] w-full my-6"
      ></div>
      <SettingsAppearance />
    </div>
  );
};

export default SettingsAppearancePage;
