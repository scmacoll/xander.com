'use client';

import CheckoutPageContent from '@/app/components/Checkout-Page-Content/Checkout-Page-Content';

export default function CheckoutPage() {

  console.log("cart id triggered! √");

  return (
    <main>
      <CheckoutPageContent />
    </main>
  );
}


// implement useRouter() if you want to use cartId on this page in the future