import { API_BASE } from "./config";

export type Faq = { _id?: string; question: string; answer: string };

/** Live FAQs from the app's backend (the same list the app shows). */
export async function fetchFaqs(signal?: AbortSignal): Promise<Faq[]> {
  const res = await fetch(`${API_BASE}/faqs?limit=50`, { signal });
  if (!res.ok) throw new Error(`FAQs request failed (${res.status})`);
  const body = await res.json();
  const list: unknown = Array.isArray(body) ? body : body?.data;
  if (!Array.isArray(list)) return [];
  return list.filter(
    (f): f is Faq =>
      typeof f?.question === "string" && typeof f?.answer === "string",
  );
}

/**
 * Sends a message to the team through the backend's public contact endpoint
 * (POST /contact-us). It takes name, email and message; the topic is
 * prefixed onto the message so it can be triaged.
 */
export async function sendContactMessage(input: {
  name: string;
  email: string;
  topic: string;
  message: string;
}): Promise<void> {
  const res = await fetch(`${API_BASE}/contact-us`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({
      name: input.name.trim(),
      email: input.email.trim(),
      message: `[${input.topic}] ${input.message.trim()}`,
    }),
  });
  if (!res.ok) {
    let message = "We couldn't send your message. Please try again.";
    try {
      const data = await res.json();
      if (typeof data?.message === "string") message = data.message;
    } catch {
      /* keep the default */
    }
    throw new Error(message);
  }
}
