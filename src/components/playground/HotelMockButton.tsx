import { collection, doc, writeBatch } from "firebase/firestore";
import { fireStore } from "@remote/firebase";
import { HOTEL_NAMES, IMAGES, HOTEL, ROOMS, EVENTS } from "./_mock";
import { COLLECTIONS } from "@constants/collection";
import { Button } from "@sadang-turtleneck-new-ui/ui";

function random(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function HotelMockButton() {
  const handleButtonClick = async () => {
    const batch = writeBatch(fireStore);

    const hotels = HOTEL_NAMES.map((name, idx) => ({
      name,
      image: IMAGES[Math.floor(Math.random() * IMAGES.length)],
      images: IMAGES,
      price: random(120_000, 500_000),
      starRating: random(1, 5),
      ...HOTEL,
      ...(EVENTS[idx] != null && { event: EVENTS[idx] }),
    }));

    hotels.forEach((hotel) => {
      const docRef = doc(collection(fireStore, COLLECTIONS.HOTELS));
      batch.set(docRef, hotel);

      ROOMS.forEach((room) => {
        const subDocRef = doc(collection(docRef, COLLECTIONS.ROOMS));
        batch.set(subDocRef, room);
      });
    });

    await batch.commit();

    alert("목 데이터 추가 성공");
  };

  return (
    // <button onClick={handleButtonClick}>호텔 리스트 목데이터 추가</button>
    <Button full={true} size="lg" onClick={handleButtonClick}>
      호텔 리스트 목데이터 추가
    </Button>
  );
}

export default HotelMockButton;
