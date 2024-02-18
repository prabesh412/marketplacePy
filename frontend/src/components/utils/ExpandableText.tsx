import { Anchor, Text } from '@mantine/core';
import { useState } from 'react';

type descritptionProps = {
  description: string;
};
const ExpandableText = ({ description }: descritptionProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  if (!description) return null;
  const words = description.split(' ');
  const shouldTruncate = words.length > 100;
  const displayedText =
    shouldTruncate && !isExpanded
      ? words.slice(0, 100).join(' ') + '...'
      : description;

  return (
    <>
      <Text c={'dimmed'} mt={'sm'}>
        {displayedText}
      </Text>
      {shouldTruncate && (
        <Anchor
          component="span"
          onClick={() => setIsExpanded(!isExpanded)}
          style={{ cursor: 'pointer', textDecoration: 'underline' }}
        >
          {isExpanded ? 'Show Less' : 'Show More'}
        </Anchor>
      )}
    </>
  );
};
export default ExpandableText;
