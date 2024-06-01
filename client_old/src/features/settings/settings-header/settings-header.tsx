const SettingsHeader = () => {
  return (
    <>
      <header className="space-y-0.5">
        <h3 className="text-2xl font-bold tracking-light">Settings</h3>
        <p className="text-muted-foreground">
          Manage your account settings and set e-mail preferences
        </p>
      </header>
      <div
        data-orientation="horizontal"
        role="none"
        className="shrink-0 bg-border h-[1px] w-full my-6"
      ></div>
    </>
  );
};

export default SettingsHeader;
