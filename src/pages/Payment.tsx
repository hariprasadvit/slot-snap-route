import { useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

function useQuery() {
  const { search } = useLocation();
  return useMemo(() => new URLSearchParams(search), [search]);
}

const Payment = () => {
  const navigate = useNavigate();
  const query = useQuery();
  const service = query.get("service");
  const dateStr = query.get("date");
  const time = query.get("time");

  const date = dateStr ? new Date(dateStr) : undefined;

  const handlePay = async () => {
    // TODO: Integrate Stripe Checkout via Supabase Edge Function `create-payment`.
    // For now, simulate success and redirect.
    navigate(`/payment-success?${query.toString()}`);
  };

  return (
    <>
      <Helmet>
        <title>Secure Payment | Smooth Scheduling</title>
        <meta name="description" content="Complete your appointment booking with a secure payment." />
        <link rel="canonical" href={typeof window !== 'undefined' ? window.location.href : '/payment'} />
      </Helmet>
      <main className="min-h-screen flex items-center justify-center bg-background px-4 py-12">
        <section className="w-full max-w-2xl">
          <header className="text-center mb-8">
            <h1 className="text-3xl font-bold">Payment</h1>
            <p className="mt-2 text-muted-foreground">You can use test mode or connect Stripe later.</p>
          </header>

          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li><span className="text-muted-foreground">Service:</span> <strong>{service}</strong></li>
                <li><span className="text-muted-foreground">Date:</span> <strong>{date?.toLocaleDateString()}</strong></li>
                <li><span className="text-muted-foreground">Time:</span> <strong>{time}</strong></li>
                <li><span className="text-muted-foreground">Total:</span> <strong>$49.00</strong></li>
              </ul>
            </CardContent>
            <CardFooter className="justify-end gap-3">
              <Button variant="outline" onClick={() => navigate(-1)}>Back</Button>
              <Button variant="hero" onClick={handlePay}>Pay Now</Button>
            </CardFooter>
          </Card>
        </section>
      </main>
    </>
  );
};

export default Payment;
