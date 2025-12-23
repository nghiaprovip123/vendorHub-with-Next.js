import { Stack } from '@mui/material';

import { LogoWithSlogan } from '@/src/containers/Authen';
import { 
  MoneyDecorEmoji, 
  StarDecorEmoji, 
  SaleDecorEmoji,
} from '@/components/common/Emoji';

import './styles.scss';

type Props = {
 children: React.ReactNode;
};

const AuthenLayout = ({ children }: Props) => {
  return (
    <Stack padding={5} position='relative'>
      <LogoWithSlogan />

      <MoneyDecorEmoji 
        width={250} 
        height={250} 
        top={56}
        left={100}
      />
      <StarDecorEmoji 
        width={200}
        height={200} 
        top={500}
        left={300}
      />
      <SaleDecorEmoji 
        width={250} 
        height={250} 
        right={100}
        top={80}
      />

      <Stack mt={4} zIndex={10}>
        {children}
      </Stack>
    </Stack>
  );
}

export default AuthenLayout;
