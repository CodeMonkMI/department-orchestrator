import { motion } from "framer-motion";
type PageTitleProps = {
  title: string;
  description?: string;
};

const PageTitle: React.FC<PageTitleProps> = ({ description, title }) => {
  return (
    <div>
      <motion.h2
        className="text-2xl font-bold"
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
      >
        {title}
      </motion.h2>
      {description && (
        <motion.p
          className="text-slate-500 mt-1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.3 }}
        >
          {description}
        </motion.p>
      )}
    </div>
  );
};

export default PageTitle;
