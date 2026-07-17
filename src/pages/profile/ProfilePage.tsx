import { motion } from "framer-motion";
import { User, Mail, Phone, Calendar, BookOpen, Award, CreditCard as Edit } from "lucide-react";

import { PageHeader } from "@/components/common/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/context/AuthContext";
import { ROLE_LABELS } from "@/constants/roles";

export function ProfilePage() {
  const { user, role } = useAuth();

  return (
    <div>
      <PageHeader
        title="Profile"
        description="View and manage your profile information."
        actions={<Button variant="outline" size="sm"><Edit className="size-4" /> Edit Profile</Button>}
      />

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Profile card */}
        <Card className="lg:col-span-1">
          <CardContent className="p-6 text-center">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="size-24 rounded-full gradient-brand flex items-center justify-center text-white text-3xl font-bold mx-auto mb-4 shadow-glow"
            >
              {user?.displayName?.[0] ?? "U"}
            </motion.div>
            <h2 className="text-lg font-semibold">{user?.displayName ?? "User"}</h2>
            <p className="text-sm text-muted-foreground">{user?.email}</p>
            <Badge variant="secondary" className="mt-2 capitalize">
              {role ? ROLE_LABELS[role] : "User"}
            </Badge>
          </CardContent>
        </Card>

        {/* Details */}
        <div className="lg:col-span-2 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Personal Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                { icon: User, label: "Full Name", value: user?.displayName },
                { icon: Mail, label: "Email", value: user?.email },
                { icon: Phone, label: "Phone", value: "+91 98765 43210" },
                { icon: Calendar, label: "Joined", value: "Jan 2025" },
                { icon: BookOpen, label: "Enrolled Courses", value: "5" },
                { icon: Award, label: "Achievements", value: "12 badges" },
              ].map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 }}
                  className="flex items-center gap-3 rounded-lg border border-border/60 p-3"
                >
                  <div className="size-9 rounded-lg bg-muted flex items-center justify-center shrink-0">
                    <item.icon className="size-4 text-muted-foreground" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-muted-foreground">{item.label}</p>
                    <p className="text-sm font-medium">{item.value ?? "—"}</p>
                  </div>
                </motion.div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
