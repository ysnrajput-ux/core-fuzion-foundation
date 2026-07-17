import type { ReactNode } from "react";
import { motion } from "framer-motion";

import { PageHeader } from "@/components/common/PageHeader";
import { Card, CardContent } from "@/components/ui/card";
import { EmptyState } from "@/components/common/EmptyState";

interface Props {
  title: string;
  description: string;
  icon?: ReactNode;
  action?: ReactNode;
}

export function PlaceholderPage({ title, description, icon, action }: Props) {
  return (
    <div>
      <PageHeader title={title} description={description} actions={action} />
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
        <Card>
          <CardContent className="py-16">
            <EmptyState
              icon={icon}
              title="Coming soon"
              description="This module is being prepared. Backend logic will be wired in the next phase."
              action={action}
            />
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
