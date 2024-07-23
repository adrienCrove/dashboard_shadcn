type Props={
    children?: React.ReactNode;
}

export default function AuthLayout({children}: Props) {
    return (
        <div className=" flex flex-col min-h-screen justify-center bg-gray-100 items-center">
        {children}
        </div>
    );
  }