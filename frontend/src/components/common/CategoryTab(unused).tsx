import React, { useState, useEffect } from 'react';
import { Tabs, rem, Menu, Text } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import {
  IconCar,
  IconBuilding,
  IconMotorbike,
  IconTable,
  IconHome,
  IconBook,
  IconDog,
  IconWoman,
  IconBriefcase,
  IconBallFootball,
  IconShoe,
  IconCategory,
} from '@tabler/icons-react';

export function CategoryTab() {
  const MainTabStyle = { paddingBottom: rem(15) };
  const iconStyle = { width: rem(20), height: rem(20) };
  const tabStyle = { paddingTop: rem(15) };
  const tabContent = { paddingLeft: rem(15) };

  const isSmallScreen = useMediaQuery('(max-width: 768px)');
  const [selectedCategory, setSelectedCategory] = useState<string>('');

  const categories = [
    { title: 'Rentals', icon: <IconHome style={iconStyle} /> },
    { title: 'Realstate', icon: <IconBuilding style={iconStyle} /> },
    { title: 'Motorbike & Mopeds', icon: <IconMotorbike style={iconStyle} /> },
    { title: 'Cars & Trucks', icon: <IconCar style={iconStyle} /> },
    {
      title: 'Clothes & Thrifts',
      icon: <IconShoe style={iconStyle} />,
    },
    { title: 'Furniture', icon: <IconTable style={iconStyle} /> },
    { title: 'Books & Learning', icon: <IconBook style={iconStyle} /> },
    { title: 'Jobs & Hiring', icon: <IconBriefcase style={iconStyle} /> },
    { title: 'Pets & Pet-products', icon: <IconDog style={iconStyle} /> },
    { title: 'Beauty & Cosmetics', icon: <IconWoman style={iconStyle} /> },
    { title: 'Sports', icon: <IconBallFootball style={iconStyle} /> },
  ];
  const handleCategorySelect = (category: string) =>
    setSelectedCategory(category);

  console.log(selectedCategory);
  return (
    <div>
      {isSmallScreen ? (
        <>
          <Menu shadow="md" width={200}>
            <Menu.Target>
              <IconCategory />
            </Menu.Target>

            <Menu.Dropdown>
              <Menu.Label>Categories</Menu.Label>
              {categories.map((category) => (
                <Menu.Item
                  key={category.title}
                  icon={category.icon}
                  onClick={() => {
                    handleCategorySelect(category.title);
                  }}
                >
                  {category.title}
                </Menu.Item>
              ))}
            </Menu.Dropdown>
          </Menu>
        </>
      ) : (
        <>
          <Tabs
            style={MainTabStyle}
            color="cyan"
            orientation="vertical"
            value={selectedCategory}
          >
            <Tabs.List>
              {categories.map((category) => (
                <Tabs.Tab
                  key={category.title}
                  style={tabStyle}
                  value={category.title}
                  icon={category.icon}
                  onClick={() => handleCategorySelect(category.title)}
                >
                  {category.title}
                </Tabs.Tab>
              ))}
            </Tabs.List>

            {categories.map((category) => (
              <Tabs.Panel
                key={category.title}
                style={tabContent}
                value={category.title}
              >
                {category.title}
              </Tabs.Panel>
            ))}
          </Tabs>
          {selectedCategory === '' && (
            <Text size="xs" color="gray">
              select a category
            </Text>
          )}
        </>
      )}
    </div>
  );
}
