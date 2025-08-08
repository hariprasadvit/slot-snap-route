import { useMemo } from "react";
import { useLocation, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

function useQuery() {
  const { search } = useLocation();
  return useMemo(() => new URLSearchParams(search), [search]);
}

const PaymentSuccess = () => {
  const query = useQuery();
  const service = query.get("service");
  const dateStr = query.get("date");
  const time = query.get("time");
  const date = dateStr ? new Date(dateStr) : undefined;

  return (
    <>
      <Helmet>
        <title>Payment Successful | Smooth Scheduling</title>
        <meta name="description" content="Your appointment has been booked. A confirmation has been sent." />
        <link rel="canonical" href={typeof window !== 'undefined' ? window.location.href : '/payment-success'} />
      </Helmet>
      <main className="min-h-screen flex items-center justify-center bg-background px-4 py-12">
        <section className="w-full max-w-2xl text-center">
          <Card>
            <CardHeader>
              <CardTitle>You're all set!</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Thank you for your payment. Your appointment is confirmed.</p>
              <div className="mt-4 grid gap-2">
                <div><span className="text-muted-foreground">Service:</span> <strong>{service}</strong></div>
                <div><span className="text-muted-foreground">Date:</span> <strong>{date?.toLocaleDateString()}</strong></div>
                <div><span className="text-muted-foreground">Time:</span> <strong>{time}</strong></div>
              </div>
            </CardContent>
            <CardFooter className="justify-center">
              <Button asChild variant="hero">
                <Link to="/">Return Home</Link>
              </Button>
            </CardFooter>
          </Card>
        </section>
      </main>
    </>
  );
};

export default PaymentSuccess;
