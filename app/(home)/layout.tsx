import '@/src/constants/styles/_root.scss';

type Props = {
 children: React.ReactNode;
};

const HomeLayout = ({ children }: Props) => {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}

export default HomeLayout;
