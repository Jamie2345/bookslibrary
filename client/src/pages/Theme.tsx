import NavbarNoSearch from "../components/NavbarNoSearch";
import Select from "react-select";
import { themeOptions } from "../data/themeOptions";
import { useState } from "react";

export default function Theme() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "light";
  });

  const handleSetTheme = () => {
    localStorage.setItem("theme", theme);
    document.documentElement.setAttribute("data-theme", theme);
  };

  const currentThemeOption = themeOptions.find(
    (option) => option.value === theme
  );

  return (
    <main className="flex w-full min-h-screen bg-base-200">
      <NavbarNoSearch />
      <div className="flex w-full flex-col my-32 mx-12 lg:mx-20">
        <h2 className="mb-4 text-lg font-semibold text-base-content">
          Toggle Theme
        </h2>
        <div className="flex items-center">
          <Select
            options={themeOptions}
            className="w-full max-w-[300px] mr-4"
            isClearable={true}
            defaultValue={currentThemeOption}
            onChange={(selectedOption) => {
              if (selectedOption) {
                setTheme(selectedOption.value);
              } else {
                setTheme("light");
              }
            }}
            placeholder="Select a theme"
            theme={(theme) => ({
              ...theme,
              colors: {
                ...theme.colors,
                //after select dropdown option
                primary50: "oklch(var(--pc))",
                //Border and Background dropdown color
                primary: "oklch(var(--p) / 0.7)",
                //Background hover dropdown color
                primary25: "oklch(var(--b3))",
                //Background color
                neutral0: "oklch(var(--b1))",
                //Border before select
                neutral20: "oklch(var(--bc) / 0.3)",
                //Hover border
                neutral30: "oklch(var(--bc) / 0.5)",
                //No options color
                neutral40: "oklch(var(--bc / 0.6))",
                //Select color
                neutral50: "oklch(var(--bc) / 0.6)",
                //arrow icon when click select
                neutral60: "oklch(var(--bc) / 0.5)",
                //Text color
                neutral80: "oklch(var(--bc))",

                neutral10: "oklch(var(--b2))",
              },
            })}
          />
          <button
            className="btn btn-primary btn-sm h-[38px]"
            onClick={handleSetTheme}
          >
            Set Theme
          </button>
        </div>
      </div>
    </main>
  );
}
