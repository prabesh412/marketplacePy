import { useState } from 'react';
import {
  IconUserCheck,
  IconCircleCheck,
  IconWriting,
  IconUpload,
  IconCircleX,
} from '@tabler/icons-react';
import { Stepper } from '@mantine/core';

const ListingStepper = ({ step, form }: any) => {
  return (
    <Stepper
      mb={'lg'}
      breakpoint={'sm'}
      active={step}
      completedIcon={<IconCircleCheck />}
    >
      <Stepper.Step
        icon={<IconUserCheck size="1.1rem" />}
        label="Step 1"
        description="Create an account"
      />
      <Stepper.Step
        icon={<IconWriting size="1.1rem" />}
        label="Step 2"
        description="Add Listing detail"
        allowStepSelect={step > 1}
        completedIcon={
          form &&
          form.error &&
          Object.keys(form.error).length !== 0 && <IconCircleX />
        }
      />
      <Stepper.Step
        icon={<IconUpload size="1.1rem" />}
        label="Step 3"
        description="Review and publish"
      />
    </Stepper>
  );
};
export default ListingStepper;
