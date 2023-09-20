import { notifications } from '@mantine/notifications';

interface PageProps {
  message: string;
  title: string;
  color: string;
}
const ShowNotification = ({ message, title, color }: PageProps) => {
  notifications.show({
    id: title,
    title,
    message,
    color,
  });
};
export default ShowNotification;
