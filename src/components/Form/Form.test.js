import { render, screen } from "@testing-library/react";

import userEvent from "@testing-library/user-event";
import Form from "./Form";

test("koşulların onaylanmasına göre buton aktifliği", async () => {
  render(<Form />);

  const user = userEvent.setup();

  // Gerekli elemanları alma

  // Checkbox'ı seçiyoruz
  const termsCheck = screen.getByRole("checkbox", {
    name: "Kosulları okudum ve kabul ediyorum",
  });

  // Butonu seçiyoruz
  const orderBtn = screen.getByRole("button", { name: /siparişi onayla/i });

  // Butonun başlangıçta devre dışı olduğunu kontrol etme
  expect(orderBtn).toBeDisabled();

  // Checkbox'ın başlangıçta işaretlenmediğini kontrol etme
  expect(termsCheck).not.toBeChecked();

  // Checkbox'ı tıklayarak butonun etkinleştirildiğini kontrol etme
  await user.click(termsCheck);
  expect(orderBtn).toBeEnabled();

  // Checkbox'ın tikini kaldırarak butonun tekrar devre dışı olduğunu kontrol etme
  await user.click(termsCheck);
  expect(orderBtn).toBeDisabled();
});

test("buton üzerine mouse geldiğinde açıklama kutucuğu çıkıyor mu", async () => {
  render(<Form />);

  const user = userEvent.setup();

  // Gerekli elemanları alma

  // Checkbox'ı seçiyoruz
  const termsCheck = screen.getByRole("checkbox");

  // Checkbox'ı işaretliyoruz
  await user.click(termsCheck);

  // Butonu seçiyoruz
  const orderBtn = screen.getByRole("button");

  // Butonun üzerine mouse gelindiğinde açıklama kutucuğunun görünür hale geldiğini kontrol etme
  await user.hover(orderBtn);

  // Açıklama kutucuğunu seçiyoruz
  const popup = screen.getByTestId("popup");

  // Açıklama kutucuğunun görünür olduğunu kontrol etme
  expect(popup).toHaveStyle("display:block");

  // Mouse'un buton üzerinden çekildiğinde açıklama kutucuğunun gizlendiğini kontrol etme
  await user.unhover(orderBtn);

  // Açıklama kutucuğunun gizlendiğini kontrol etme
  expect(popup).toHaveStyle("visibility: hidden");
});
