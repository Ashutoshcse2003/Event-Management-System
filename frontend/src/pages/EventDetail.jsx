import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Calendar,
  MapPin,
  Users,
  Clock,
  Mail,
  User,
  UsersRound,
  ArrowLeft,
  CheckCircle,
} from "lucide-react";
import { getEvents, registerForEvent } from "../api";
import Input from "../components/Input";
import Button from "../components/Button";
import { useToast } from "../contexts/ToastContext";

export default function EventDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const toast = useToast();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", team: "" });

  useEffect(() => {
    getEvents()
      .then((list) => {
        const ev = list.find((e) => e.id === id);
        setEvent(ev);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [id]);

  async function submit(e) {
    e.preventDefault();
    if (!form.name || !form.email) {
      toast.warning("Please fill in all required fields");
      return;
    }

    setSubmitting(true);
    try {
      const res = await registerForEvent(id, {
        name: form.name,
        email: form.email,
        team: form.team,
      });
      toast.success(`✨ Registered! ID: ${res.confirmation.participantId}`);
      setForm({ name: "", email: "", team: "" });
    } catch (err) {
      toast.error(err.message || "Registration failed");
    } finally {
      setSubmitting(false);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-neutral-600">Loading event...</p>
        </div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">📅</span>
          </div>
          <h3 className="text-xl font-semibold text-neutral-900 mb-2">
            Event not found
          </h3>
          <Button variant="primary" onClick={() => navigate("/events")}>
            Back to Events
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Hero Section */}
      <div className="relative h-80 bg-gradient-to-br from-primary-600 via-primary-500 to-secondary-400 overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.05"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
          }}
        ></div>

        <div className="relative container mx-auto max-w-6xl h-full flex items-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-white"
          >
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate("/events")}
              leftIcon={<ArrowLeft className="w-4 h-4" />}
              className="mb-4 text-white hover:bg-white/20"
            >
              Back to Events
            </Button>
            <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">
              {event.title}
            </h1>
            <div className="flex flex-wrap gap-4 text-white/90">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                <span>{event.date || "TBA"}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                <span>{event.venue || "Venue TBA"}</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                <span>{event.participants || 0} participants</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto max-w-6xl px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Event Details */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2"
          >
            <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-8 mb-6">
              <h2 className="text-2xl font-heading font-bold text-neutral-900 mb-4">
                About This Event
              </h2>
              <p className="text-neutral-700 leading-relaxed">
                {event.description ||
                  "An exciting event you don't want to miss! Join us for an amazing experience filled with learning, networking, and fun activities."}
              </p>
            </div>

            {/* Event Highlights */}
            <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-8">
              <h2 className="text-2xl font-heading font-bold text-neutral-900 mb-6">
                Event Highlights ✨
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  {
                    icon: Users,
                    label: "Networking",
                    desc: "Connect with peers",
                  },
                  {
                    icon: CheckCircle,
                    label: "Certificate",
                    desc: "Get certified",
                  },
                  { icon: Clock, label: "Duration", desc: "Full day event" },
                  {
                    icon: UsersRound,
                    label: "Team Event",
                    desc: "Bring your team",
                  },
                ].map((item, idx) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + idx * 0.1 }}
                    className="flex items-start gap-3 p-4 rounded-lg bg-neutral-50 hover:bg-primary-50 transition-colors"
                  >
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary-500 to-secondary-400 flex items-center justify-center flex-shrink-0">
                      <item.icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-neutral-900">
                        {item.label}
                      </h4>
                      <p className="text-sm text-neutral-600">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Registration Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:sticky lg:top-24 h-fit"
          >
            <div className="bg-white rounded-xl shadow-lg border border-neutral-200 p-8">
              <h2 className="text-2xl font-heading font-bold text-neutral-900 mb-2">
                Register Now
              </h2>
              <p className="text-neutral-600 mb-6">Secure your spot today!</p>

              <form onSubmit={submit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Full Name *
                  </label>
                  <Input
                    placeholder="John Doe"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    leftIcon={<User className="w-4 h-4" />}
                    fullWidth
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Email Address *
                  </label>
                  <Input
                    type="email"
                    placeholder="john@example.com"
                    value={form.email}
                    onChange={(e) =>
                      setForm({ ...form, email: e.target.value })
                    }
                    leftIcon={<Mail className="w-4 h-4" />}
                    fullWidth
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Team Name (Optional)
                  </label>
                  <Input
                    placeholder="Team Awesome"
                    value={form.team}
                    onChange={(e) => setForm({ ...form, team: e.target.value })}
                    leftIcon={<UsersRound className="w-4 h-4" />}
                    fullWidth
                  />
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  fullWidth
                  loading={submitting}
                  leftIcon={<CheckCircle className="w-5 h-5" />}
                >
                  Complete Registration
                </Button>

                <p className="text-xs text-neutral-500 text-center">
                  By registering, you agree to receive event updates
                </p>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
