import { List, Trigger } from "@radix-ui/react-tabs";

export type TabProps = {
  tabs: {
    value: string;
    name: string;
    withPing: boolean;
    isShowing: boolean;
  }[];
};

export const TabMenu: React.FC<TabProps> = ({ tabs }) => {
  return (
    <List className="fixed bottom-8 left-0 grid place-items-center w-full grid-cols-1 z-50">
      <div className=" bg-neutral-900/60 backdrop-blur  py-1 px-1 ring ring-neutral-900 w-auto gap-1 rounded-full flex justify-between items-center drop-shadow-[0_2px_10px_rgba(255,255,255,0.09)]">
        {tabs.map((tab, index) =>
          tab.isShowing ? (
            <Trigger
              value={tab.value}
              key={tab.value + `${index}`}
              className="data-[state='active']:bg-neutral-800 px-4 py-2 rounded-full text-xs transition-colors"
            >
              {tab.withPing ? (
                <div className="rounded-full top-2 right-2 absolute bg-green-500/20 ">
                  <p className="p-[0.2rem] bg-green-500 rounded-full animate-ping"></p>
                </div>
              ) : null}
              {tab.name}
            </Trigger>
          ) : null
        )}
      </div>
    </List>
  );
};
