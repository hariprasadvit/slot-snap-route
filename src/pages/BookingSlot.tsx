import { useNavigate } from "react-router-dom";
import { useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";

const services = [
  { id: "consult", name: "Consultation", duration: 30 },
  { id: "therapy", name: "Therapy Session", duration: 60 },
  { id: "followup", name: "Follow-up", duration: 30 },
];

const timeSlots = [
  "09:00","09:30","10:00","10:30","11:00","11:30",
  "13:00","13:30","14:00","14:30","15:00","15:30","16:00"
];

const BookingSlot = () => {
  const navigate = useNavigate();
  const [service, setService] = useState<string>("");
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [time, setTime] = useState<string>("");

  const canContinue = useMemo(() => !!service && !!date && !!time, [service, date, time]);

  const handleContinue = () => {
    if (!canContinue || !date) return;
    const params = new URLSearchParams({
      service,
      date: date.toISOString(),
      time,
    });
    navigate(`/confirmation?${params.toString()}`);
  };

  return (
    <>
      <Helmet>
        <title>Book an Appointment | Smooth Scheduling</title>
        <meta name="description" content="Choose a service, pick a date and time, and book your appointment in seconds." />
        <link rel="canonical" href={typeof window !== 'undefined' ? window.location.href : '/'} />
        <meta property="og:title" content="Book an Appointment" />
        <meta property="og:description" content="Fast, user-friendly appointment booking." />
      </Helmet>
      <main className="min-h-screen flex items-center justify-center bg-background px-4 py-12">
        <section className="w-full max-w-4xl">
          <header className="text-center mb-8">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Book an Appointment
            </h1>
            <p className="mt-2 text-muted-foreground">Select a service, pick a date, and choose an available time.</p>
          </header>

          <Card className="group transition-[transform,box-shadow] duration-300 hover:shadow-[var(--shadow-glow)]">
            <CardHeader>
              <CardTitle>Scheduling Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Service</label>
                  <Select value={service} onValueChange={setService}>
                    <SelectTrigger aria-label="Select service">
                      <SelectValue placeholder="Select a service" />
                    </SelectTrigger>
                    <SelectContent>
                      {services.map((s) => (
                        <SelectItem key={s.id} value={s.id}>{s.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {service ? services.find(s=>s.id===service)?.duration + " min" : "Duration shown after selection"}
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Date</label>
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    disabled={(d) => d < new Date(new Date().setHours(0,0,0,0))}
                    className="rounded-md border"
                  />
                </div>
              </div>

              <div className="mt-6">
                <label className="block text-sm font-medium mb-3">Time</label>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                  {timeSlots.map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setTime(t)}
                      className={`h-10 rounded-md border text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ring-offset-background ${time===t ? 'bg-primary text-primary-foreground' : 'bg-background hover:bg-accent hover:text-accent-foreground'}`}
                      aria-pressed={time===t}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
            </CardContent>
            <CardFooter className="justify-end gap-3">
              <Button variant="subtle" onClick={() => { setService(""); setDate(undefined); setTime(""); }}>Clear</Button>
              <Button variant="hero" onClick={handleContinue} disabled={!canContinue}>
                Continue
              </Button>
            </CardFooter>
          </Card>
        </section>
      </main>

      {/* Structured Data for SEO */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          name: "Online Appointment Booking",
          provider: { "@type": "Organization", name: "Smooth Scheduling" }
        })}
      </script>
    </>
  );
};

export default BookingSlot;
