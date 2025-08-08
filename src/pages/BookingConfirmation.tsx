import { useEffect, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

function useQuery() {
  const { search } = useLocation();
  return useMemo(() => new URLSearchParams(search), [search]);
}

const BookingConfirmation = () => {
  const navigate = useNavigate();
  const query = useQuery();
  const service = query.get("service");
  const dateStr = query.get("date");
  const time = query.get("time");

  useEffect(() => {
    if (!service || !dateStr || !time) navigate("/", { replace: true });
  }, [service, dateStr, time, navigate]);

  const date = dateStr ? new Date(dateStr) : undefined;

  return (
    <>
      <Helmet>
        <title>Confirm Your Booking | Smooth Scheduling</title>
        <meta name="description" content="Review your appointment details and confirm your booking." />
        <link rel="canonical" href={typeof window !== 'undefined' ? window.location.href : '/confirmation'} />
      </Helmet>
      <main className="min-h-screen flex items-center justify-center bg-background px-4 py-12">
        <section className="w-full max-w-2xl">
          <header className="text-center mb-8">
            <h1 className="text-3xl font-bold">Confirm your booking</h1>
            <p className="mt-2 text-muted-foreground">Make sure everything looks right.</p>
          </header>

          <Card>
            <CardHeader>
              <CardTitle>Appointment Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li><span className="text-muted-foreground">Service:</span> <strong>{service}</strong></li>
                <li><span className="text-muted-foreground">Date:</span> <strong>{date?.toLocaleDateString()}</strong></li>
                <li><span className="text-muted-foreground">Time:</span> <strong>{time}</strong></li>
              </ul>
            </CardContent>
            <CardFooter className="justify-between">
              <Button variant="outline" onClick={() => navigate("/")}>Change</Button>
              <Button variant="hero" onClick={() => navigate(`/payment?${query.toString()}`)}>Proceed to Payment</Button>
            </CardFooter>
          </Card>
        </section>
      </main>
    </>
  );
};

export default BookingConfirmation;
