"use client";

import { useTransition } from "react";
import {
  createNewSubscription,
  activateSubscription,
  deactivateSubscription,
} from "@/lib/actions/subscription";
import { useToast } from "@/components/toast-provider";

type SubscriptionStatus = "active" | "inactive" | null;

export default function SubscribeButton({
  status,
}: {
  status: SubscriptionStatus;
}) {
  const [isPending, startTransition] = useTransition();
  const { addToast } = useToast();

  const handleSubscribe = () => {
    startTransition(async () => {
      try {
        if (status === "active") {
          await deactivateSubscription();
          addToast("You have unsubscribed.", "info");
        } else if (status === null) {
          // Try to activate an existing subscription first (token cookie may already exist).
          // activateSubscription() returns null only when there is no token cookie at all,
          // meaning this is a genuinely new user who needs a subscription created first.
          const activated = await activateSubscription();
          if (!activated) {
            await createNewSubscription();
            await activateSubscription();
          }
          addToast("You are now subscribed!", "success");
        } else {
          await activateSubscription();
          addToast("You are now subscribed!", "success");
        }
      } catch (e) {
        console.error("[SubscribeButton]", JSON.stringify(e, null, 2));
        addToast("Something went wrong. Please try again later.", "error");
      }
    });
  };

  return (
    <div className="flex flex-col items-center gap-2">
      {status === "active" ? (
        <button
          className="btn min-w-30"
          onClick={handleSubscribe}
          disabled={isPending}
        >
          {isPending ? "Updating..." : "Unsubscribe"}
        </button>
      ) : (
        <button
          className="btn btn-primary min-w-30"
          onClick={handleSubscribe}
          disabled={isPending}
        >
          {isPending ? "Updating..." : "Subscribe"}
        </button>
      )}
    </div>
  );
}