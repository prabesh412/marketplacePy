import { IconArrowUp, IconChevronUp, IconHeart } from '@tabler/icons-react';
import { useWindowScroll } from '@mantine/hooks';
import {
  ActionIcon,
  Affix,
  Button,
  Text,
  Transition,
  rem,
} from '@mantine/core';

const AffixButton = () => {
  const [scroll, scrollTo] = useWindowScroll();

  return (
    <>
      <Affix position={{ bottom: rem(80), right: rem(20) }}>
        <Transition transition="slide-up" mounted={scroll.y > 900}>
          {(transitionStyles) => (
            <ActionIcon
              size={35}
              radius="xl"
              color={'lime'}
              variant="filled"
              onClick={() => scrollTo({ y: 0 })}
              style={transitionStyles}
            >
              <IconArrowUp size={25} stroke={2} />
            </ActionIcon>
          )}
        </Transition>
      </Affix>
    </>
  );
};
export default AffixButton;
