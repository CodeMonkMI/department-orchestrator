type PageTitleProps = {
  title: string;
  description?: string;
};

const PageTitle: React.FC<PageTitleProps> = ({ description, title }) => {
  return (
    <div>
      <h2 className="text-2xl font-bold">{title}</h2>
      {description && <p className="text-slate-500 mt-1">{description}</p>}
    </div>
  );
};

export default PageTitle;
