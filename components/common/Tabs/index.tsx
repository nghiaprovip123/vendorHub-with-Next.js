import { 
  Tabs as LibTabs, 
  TabsList, 
  TabsTrigger
} from "@/components/ui";
import { FONT_WEIGHT, TEXT_SIZE } from "@/src/constants/text";
import { COLOR_CODES } from "@/src/constants/color";

type Props = {
  tabsList: { label: string, value: string }[];
  currentTab: string;
  onChange: (value: string) => void;
};

const Tabs = ({ tabsList, currentTab, onChange }: Props) => {
  return (
    <LibTabs defaultValue={currentTab} onValueChange={onChange}>
      <TabsList
        style={{
          borderRadius: '4px',
          border: '2px solid var(--main-border-color)',
          overflow: 'hidden'
        }}
      >
        {tabsList.map((tab, index) => {
          return (
            <TabsTrigger
              key={index}
              value={tab.value}
              style={{
                fontWeight: FONT_WEIGHT.BOLD,
                fontSize: TEXT_SIZE.H2XL,
                lineHeight: '40px',
                height: '40px',
                width: '280px',
                borderRadius: 0,
                backgroundColor: `${
                  currentTab === tab.value ? COLOR_CODES.PRIMARY_COLOR : COLOR_CODES.SECONDARY_BG
                }`
              }}
            >
              {tab.label}
            </TabsTrigger>
          );
        })}
      </TabsList>
    </LibTabs>
  );
};

export default Tabs;
