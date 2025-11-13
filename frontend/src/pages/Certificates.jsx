import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Award,
  Download,
  Calendar,
  CheckCircle,
  Clock,
  Search,
} from "lucide-react";
import Button from "../components/Button";
import Input from "../components/Input";
import { useToast } from "../contexts/ToastContext";

export default function Certificates() {
  const toast = useToast();
  const [searchQuery, setSearchQuery] = useState("");

  const certificates = [
    {
      id: "cert1",
      eventName: "Web Development Workshop 2024",
      date: "2024-01-15",
      status: "available",
    },
    {
      id: "cert2",
      eventName: "React Masterclass",
      date: "2024-01-10",
      status: "available",
    },
    {
      id: "cert3",
      eventName: "UI/UX Design Conference",
      date: "2024-02-01",
      status: "pending",
    },
  ];

  const filteredCertificates = certificates.filter((cert) =>
    cert.eventName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDownload = (cert) => {
    if (cert.status === "available") {
      toast.success(`📄 Downloading certificate for "${cert.eventName}"`);
    } else {
      toast.warning("Certificate is still being processed");
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50 py-8 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-heading font-bold text-neutral-900 mb-2">
            My Certificates 🏆
          </h1>
          <p className="text-neutral-600">
            Download and manage your achievement certificates
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
        >
          >
          {[
            {
              label: "Total Certificates",
              value: certificates.length,
              icon: Award,
              color: "from-primary-500 to-secondary-400",
            },
            {
              label: "Available",
              value: certificates.filter((c) => c.status === "available")
                .length,
              icon: CheckCircle,
              color: "from-success to-success-dark",
            },
            {
              label: "Pending",
              value: certificates.filter((c) => c.status === "pending").length,
              icon: Clock,
              color: "from-warning to-warning-dark",
            },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.05 }}
              whileHover={{ y: -4 }}
              className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6"
            >
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-medium text-neutral-600">
                  {stat.label}
                </p>
                <div
                  className={`w-10 h-10 rounded-lg bg-gradient-to-r ${stat.color} flex items-center justify-center`}
                >
                  <stat.icon className="w-5 h-5 text-white" />
                </div>
              </div>
              <p
                className={`text-3xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}
              >
                {stat.value}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Search */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-6"
        >
          <Input
            placeholder="Search certificates..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            leftIcon={<Search className="w-4 h-4" />}
            fullWidth
          />
        </motion.div>

        {/* Certificates List */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="space-y-4"
        >
          {filteredCertificates.length === 0 ? (
            <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-12 text-center">
              <div className="w-24 h-24 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-12 h-12 text-neutral-400" />
              </div>
              <h3 className="text-xl font-semibold text-neutral-900 mb-2">
                No certificates found
              </h3>
              <p className="text-neutral-600">
                {searchQuery
                  ? "Try a different search term"
                  : "Complete events to earn certificates"}
              </p>
            </div>
          ) : (
            filteredCertificates.map((cert, index) => (
              <motion.div
                key={cert.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + index * 0.05 }}
                whileHover={{ scale: 1.01 }}
                className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6 hover:shadow-md transition-all"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex items-start gap-4 flex-1">
                    <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-primary-500 to-secondary-400 flex items-center justify-center flex-shrink-0">
                      <Award className="w-8 h-8 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-heading font-semibold text-lg text-neutral-900 mb-1">
                        {cert.eventName}
                      </h3>
                      <div className="flex items-center gap-2 text-sm text-neutral-600 mb-2">
                        <Calendar className="w-4 h-4" />
                        <span>Issued on {cert.date}</span>
                      </div>
                      <span
                        className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${
                          cert.status === "available"
                            ? "bg-success text-white"
                            : "bg-warning text-white"
                        }`}
                      >
                        {cert.status === "available" ? (
                          <CheckCircle className="w-3 h-3" />
                        ) : (
                          <Clock className="w-3 h-3" />
                        )}
                        {cert.status === "available"
                          ? "Available"
                          : "Processing"}
                      </span>
                    </div>
                  </div>

                  <Button
                    variant={cert.status === "available" ? "primary" : "ghost"}
                    size="md"
                    onClick={() => handleDownload(cert)}
                    leftIcon={<Download className="w-4 h-4" />}
                    disabled={cert.status !== "available"}
                  >
                    Download
                  </Button>
                </div>
              </motion.div>
            ))
          )}
        </motion.div>
      </div>
    </div>
  );
}
