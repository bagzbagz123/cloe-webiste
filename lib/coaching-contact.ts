const whatsappNumber = "17866356037";

export function whatsappLink(message: string) {
  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export function coachingLink() {
  return whatsappLink("Hi Clotilde! I'm interested in your online coaching. Can you tell me how to get started?");
}
