import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Calendar,
  MapPin,
  Users,
  Clock,
  Search,
  Filter,
  Sparkles,
} from "lucide-react";
import { getEvents } from "../api";
import Input from "../components/Input";
import Button from "../components/Button";

export default function Events() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    let mounted = true;
    getEvents()
      .then((e) => {
        if (mounted) setEvents(e);
      })
      .catch((err) => {
        if (mounted) setError(err.message);
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });
    return () => {
      mounted = false;
    };
  }, []);

  const filteredEvents = events.filter((event) => {
    const matchesSearch = event.title
      ?.toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-neutral-600">Loading events...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-error-light rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">⚠️</span>
          </div>
          <p className="text-error font-semibold">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50 py-8 px-4">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-heading font-bold text-neutral-900 mb-2">
            Upcoming Events 🎉
          </h1>
          <p className="text-neutral-600">
            Discover and register for exciting events
          </p>
        </motion.div>

        {/* Search and Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <Input
                placeholder="Search events..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                leftIcon={<Search className="w-4 h-4" />}
                fullWidth
              />
            </div>
            <div className="flex gap-2">
              {["all", "upcoming", "past"].map((f) => (
                <Button
                  key={f}
                  variant={filter === f ? "primary" : "ghost"}
                  size="md"
                  onClick={() => setFilter(f)}
                >
                  {f.charAt(0).toUpperCase() + f.slice(1)}
                </Button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Events Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {filteredEvents.length === 0 ? (
            <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-12 text-center">
              <div className="w-24 h-24 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="w-12 h-12 text-neutral-400" />
              </div>
              <h3 className="text-xl font-semibold text-neutral-900 mb-2">
                No events found
              </h3>
              <p className="text-neutral-600">
                {searchQuery
                  ? "Try a different search term"
                  : "Check back later for upcoming events"}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredEvents.map((event, index) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.05 }}
                >
                  <Link to={`/events/${event.id}`}>
                    <motion.div
                      whileHover={{ y: -8, scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="bg-white rounded-xl shadow-sm border border-neutral-200 overflow-hidden hover:shadow-xl transition-all h-full"
                    >
                      {/* Event Image */}
                      <div className="relative h-48 bg-gradient-to-br from-primary-500 to-secondary-400 overflow-hidden">
                        <div className="absolute inset-0 bg-black/20"></div>
                        <div className="absolute bottom-4 left-4 right-4">
                          <div className="flex items-center gap-2 text-white text-sm mb-2">
                            <Calendar className="w-4 h-4" />
                            <span>{event.date || "TBA"}</span>
                          </div>
                        </div>
                        <div className="absolute top-4 right-4 px-3 py-1 bg-white/90 backdrop-blur rounded-full text-xs font-medium text-primary-600">
                          <Sparkles className="w-3 h-3 inline mr-1" />
                          Featured
                        </div>
                      </div>

                      {/* Event Details */}
                      <div className="p-6">
                        <h3 className="font-heading font-bold text-xl text-neutral-900 mb-3">
                          {event.title}
                        </h3>

                        <div className="space-y-2 mb-4">
                          <div className="flex items-center gap-2 text-sm text-neutral-600">
                            <MapPin className="w-4 h-4 text-primary-500" />
                            <span>{event.venue || "Venue TBA"}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-neutral-600">
                            <Users className="w-4 h-4 text-primary-500" />
                            <span>{event.participants || 0} participants</span>
                          </div>
                        </div>

                        <p className="text-sm text-neutral-600 line-clamp-2 mb-4">
                          {event.description ||
                            "An exciting event you don't want to miss!"}
                        </p>

                        <Button variant="primary" size="sm" fullWidth>
                          View Details & Register
                        </Button>
                      </div>
                    </motion.div>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
