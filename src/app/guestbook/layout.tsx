const GuestbookLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <section className="mx-auto w-full max-w-[860px]">
      <div className="mb-4 mt-2 md:mt-4">{children}</div>
    </section>
  );
};

export default GuestbookLayout;
