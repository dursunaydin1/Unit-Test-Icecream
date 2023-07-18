import { render, screen } from "@testing-library/react";
import Toppings from "./Toppings";
import userEvent from "@testing-library/user-event";

test("sos kartlarının sepet state'i üzerinde yaptığı değişim", async () => {
  // "Toppings" bileşenini render ediyoruz.
  render(<Toppings />);

  // userEvent'i kullanmak için bir kullanıcı oluşturuyoruz.
  const user = userEvent.setup();

  // Toplam ücretin gösterildiği bir başlık elementini seçiyoruz.
  const total = screen.getByRole("heading", { name: /Soslar Ücret: /i });

  // "Cherries" isimli bir checkbox elementini bekliyoruz.
  const cherryCheck = await screen.findByRole("checkbox", {
    name: "Cherries",
  });

  // "/mochi/i" ifadesini içeren bir checkbox elementini bekliyoruz.
  const mochiCheck = await screen.findByRole("checkbox", {
    name: /mochi/i,
  });

  // "Cherries" checkbox'ını tıklıyoruz.
  await user.click(cherryCheck);
  // Toplam ücretin 2 olmasını bekliyoruz.
  expect(total).toHaveTextContent(2);

  // "Mochi" checkbox'ını çift tıklıyoruz.
  await user.click(mochiCheck);
  // Toplam ücretin 6 olmasını bekliyoruz.
  expect(total).toHaveTextContent(4);

  // "Cherries" checkbox'ını tekrar tıklıyoruz.
  await user.click(cherryCheck);
  // Toplam ücretin 4 olmasını bekliyoruz.
  expect(total).toHaveTextContent(2);

  // "Mochi" checkbox'ını tekrar çift tıklıyoruz.
  await user.click(mochiCheck);
  // Toplam ücretin 0 olmasını bekliyoruz.
  expect(total).toHaveTextContent(0);
});
