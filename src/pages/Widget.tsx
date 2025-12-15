import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";

const Widget = () => {
  const [amount, setAmount] = useState(10000);
  const [days, setDays] = useState(10);

  const calculateReturn = () => {
    const rate = 0.02;
    const returnAmount = Math.round(amount + amount * rate * (days / 10));
    return returnAmount;
  };

  const returnAmount = calculateReturn();

  return (
    <div className="w-full bg-transparent">
      <Card className="p-5 md:p-8 shadow-xl border-0 bg-white/95 backdrop-blur max-w-2xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-[#1A1F2C] mb-6 text-center">
          Калькулятор займов
        </h2>

        <div className="mb-6">
          <div className="flex justify-between items-baseline mb-3">
            <label className="text-lg font-semibold text-[#1A1F2C]">Сумма</label>
            <span className="text-2xl md:text-3xl font-bold text-[#1A1F2C]">
              {amount.toLocaleString('ru-RU')} ₽
            </span>
          </div>
          <Slider
            value={[amount]}
            onValueChange={(value) => setAmount(value[0])}
            min={1000}
            max={50000}
            step={1000}
            className="w-full"
          />
          <div className="flex justify-between text-sm text-muted-foreground mt-2">
            <span>1 000 ₽</span>
            <span>50 000 ₽</span>
          </div>
        </div>

        <div className="mb-6">
          <div className="flex justify-between items-baseline mb-3">
            <label className="text-lg font-semibold text-[#1A1F2C]">Срок</label>
            <span className="text-2xl md:text-3xl font-bold text-[#1A1F2C]">{days} дней</span>
          </div>
          <Slider
            value={[days]}
            onValueChange={(value) => setDays(value[0])}
            min={5}
            max={30}
            step={1}
            className="w-full"
          />
          <div className="flex justify-between text-sm text-muted-foreground mt-2">
            <span>5 дней</span>
            <span>30 дней</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-gradient-to-br from-[#F5F5FA] to-[#E8EBF5] p-4 rounded-2xl">
            <p className="text-xs text-muted-foreground mb-2">Возвращаете</p>
            <div className="flex flex-col gap-1">
              <span className="text-lg text-muted-foreground line-through">
                {returnAmount.toLocaleString('ru-RU')} ₽
              </span>
              <span className="text-2xl md:text-3xl font-bold text-[#FFD93D] bg-[#FFD93D]/20 px-3 py-1 rounded-xl inline-block w-fit">
                {amount.toLocaleString('ru-RU')} ₽
              </span>
            </div>
          </div>
          <div className="bg-gradient-to-br from-[#F5F5FA] to-[#E8EBF5] p-4 rounded-2xl">
            <p className="text-xs text-muted-foreground mb-2">Дата возврата</p>
            <p className="text-xl md:text-2xl font-bold text-[#1A1F2C]">
              {new Date(Date.now() + days * 24 * 60 * 60 * 1000).toLocaleDateString('ru-RU', {
                day: 'numeric',
                month: 'long',
                year: 'numeric'
              })}
            </p>
          </div>
        </div>

        <div className="space-y-3">
          <Button 
            className="w-full bg-[#0066FF] hover:bg-[#0052CC] text-white py-5 text-base md:text-lg rounded-2xl shadow-lg transition-all hover:scale-[1.02] font-semibold"
          >
            Получить через <span className="ml-1">гос</span><span className="text-red-500">услуги</span>
          </Button>
          <Button 
            variant="outline"
            className="w-full border-2 border-[#FFD93D] bg-white hover:bg-[#FFD93D]/10 text-[#1A1F2C] py-5 text-base md:text-lg rounded-2xl transition-all hover:scale-[1.02] font-semibold"
          >
            Получить бесплатно
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default Widget;
