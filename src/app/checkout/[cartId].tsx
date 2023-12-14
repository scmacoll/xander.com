'use client';

import { useRouter } from 'next/router';
import CheckoutPageContent from "@/app/components/Checkout-Page-Content/Checkout-Page-Content";


export default function Checkout() {
  const router = useRouter();
  const { cartId } = router.query;

  return (
    <main>
      <CheckoutPageContent cartId={cartId} />
    </main>
  );
}
