import { Card, Stepper } from '@mantine/core';
import {
  IconCheck,
  IconCircleCheck,
  IconCircleX,
  IconPhoto,
  IconUpload,
  IconUserCheck,
  IconWriting,
} from '@tabler/icons-react';

const ListingStepper = ({ step, form }: any) => {
  return (
    <Card mb={'lg'} radius={'lg'} p={'xl'}>
      <Stepper
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
          icon={<IconCheck size="1.1rem" />}
          label="Step 3"
          description="Add listing features"
        />
        <Stepper.Step
          icon={<IconPhoto size="1.1rem" />}
          label="Step 4"
          description="Add images"
        />
        <Stepper.Step
          icon={<IconUpload size="1.1rem" />}
          label="Step 5"
          description="Review and publish"
        />
      </Stepper>
    </Card>
  );
};
export default ListingStepper;
