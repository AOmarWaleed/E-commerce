import CategorySlider from "../CategorySlider/CategorySlider";
import MainSlider from "../MainSlider/MainSlider";
import Products from "../Products/Products";

export default function Home() {
  return (
    <>
      <MainSlider />
      <CategorySlider />
      <div className="size-14"></div>
      <Products />
    </>
  );
}
