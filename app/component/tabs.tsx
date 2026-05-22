"use client";

import React from "react";

type MainTab = {
  key: string;
  label: string;
};

type SubTab = {
  key: string;
  label: string;
};

type TabProps = {
  activeMainTab: string;
  activeSubTab: string;
  mainTabs: MainTab[];
  subTabs: SubTab[];
  onMainTabChange: (tab: string) => void;
  onSubTabChange: (tab: string) => void;
  renderContent: () => React.ReactNode;
};

export default function Tab({
  activeMainTab,
  activeSubTab,
  mainTabs,
  subTabs,
  onMainTabChange,
  onSubTabChange,
  renderContent,
}: TabProps) {
  return (
    <div className="w-full overflow-hidden rounded-2xl bg-white shadow-xl">
      <div className="flex border-b border-gray-200">
        {mainTabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => onMainTabChange(tab.key)}
            className={`flex-1 py-4 text-sm font-medium transition ${
              activeMainTab === tab.key
                ? "border-b-2 border-green-600 text-green-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="flex bg-gray-50 px-6 pt-3">
        {subTabs.map((tab, index) => (
          <button
            key={tab.key}
            onClick={() => onSubTabChange(tab.key)}
            className={`px-4 py-2 text-sm font-medium transition ${
              activeSubTab === tab.key
                ? "text-green-600"
                : "text-gray-500 hover:text-gray-700"
            } ${index > 0 ? "ml-1" : ""}`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {renderContent()}
    </div>
  );
}