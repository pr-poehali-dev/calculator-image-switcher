import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import Icon from "@/components/ui/icon";

const Index = () => {
  const [amount, setAmount] = useState(10000);
  const [days, setDays] = useState(10);

  const calculateReturn = () => {
    const rate = 0.02;
    const returnAmount = Math.round(amount + amount * rate * (days / 10));
    return returnAmount;
  };

  const returnAmount = calculateReturn();
  const fee = returnAmount - amount;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#E8EBF5] via-[#F5F5FA] to-[#E8EBF5]">
      <div className="container max-w-4xl mx-auto px-4 py-8 md:py-16">
        <Card className="overflow-hidden shadow-2xl border-0 mb-8 bg-gradient-to-r from-[#C5D5E8] to-[#DAE3F0]">
          <div className="relative p-8 md:p-12">
            <div 
              className="absolute inset-0 opacity-30"
              style={{
                backgroundImage: `url('https://cdn.poehali.dev/projects/00727451-82f8-48c2-bd07-f013e34b3db1/files/66b29144-64ad-4e47-a9a5-2a71617a020f.jpg')`,
                backgroundSize: 'cover',
                backgroundPosition: 'right center',
              }}
            />
            <div className="relative z-10">
              <h1 className="text-3xl md:text-5xl font-bold text-[#1A1F2C] mb-4">
                Погасим заём за вас!
              </h1>
              <p className="text-lg md:text-xl text-[#1A1F2C]/80 mb-6 max-w-xl">
                Выберем 50 счастливчиков, за которых закроем заём 15 января
              </p>
              <Button 
                className="bg-[#1A1F2C] hover:bg-[#2A2F3C] text-white px-8 py-6 text-lg rounded-2xl shadow-lg transition-all hover:scale-105"
              >
                Участвовать в акции
              </Button>
            </div>
          </div>
        </Card>

        <Card className="p-5 md:p-10 shadow-xl border-0 bg-white/95 backdrop-blur">
          <div className="mb-6 md:mb-8">
            <div className="flex justify-between items-baseline mb-3 md:mb-4">
              <label className="text-lg md:text-xl font-semibold text-[#1A1F2C]">Сумма</label>
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

          <div className="mb-6 md:mb-8">
            <div className="flex justify-between items-baseline mb-3 md:mb-4">
              <label className="text-lg md:text-xl font-semibold text-[#1A1F2C]">Срок</label>
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

          <div className="grid md:grid-cols-2 gap-4 md:gap-6 mb-6 md:mb-8">
            <div className="bg-gradient-to-br from-[#F5F5FA] to-[#E8EBF5] p-5 md:p-6 rounded-2xl">
              <p className="text-xs md:text-sm text-muted-foreground mb-2">Возвращаете</p>
              <div className="flex flex-col md:flex-row md:items-baseline gap-2">
                <span className="text-lg md:text-2xl text-muted-foreground line-through">
                  {returnAmount.toLocaleString('ru-RU')} ₽
                </span>
                <span className="text-3xl md:text-4xl font-bold text-[#FFD93D] bg-[#FFD93D]/20 px-3 md:px-4 py-1 rounded-xl inline-block w-fit">
                  {amount.toLocaleString('ru-RU')} ₽
                </span>
              </div>
            </div>
            <div className="bg-gradient-to-br from-[#F5F5FA] to-[#E8EBF5] p-5 md:p-6 rounded-2xl">
              <p className="text-xs md:text-sm text-muted-foreground mb-2">Дата возврата</p>
              <p className="text-2xl md:text-3xl font-bold text-[#1A1F2C]">
                {new Date(Date.now() + days * 24 * 60 * 60 * 1000).toLocaleDateString('ru-RU', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric'
                })}
              </p>
            </div>
          </div>

          <div className="space-y-3 md:space-y-4">
            <Button 
              className="w-full bg-[#0066FF] hover:bg-[#0052CC] text-white py-5 md:py-7 text-base md:text-lg rounded-2xl shadow-lg transition-all hover:scale-[1.02] font-semibold"
            >
              Получить через <span className="ml-1 md:ml-2">гос</span><span className="text-red-500">услуги</span>
            </Button>
            <Button 
              variant="outline"
              className="w-full border-2 border-[#FFD93D] bg-white hover:bg-[#FFD93D]/10 text-[#1A1F2C] py-5 md:py-7 text-base md:text-lg rounded-2xl transition-all hover:scale-[1.02] font-semibold"
            >
              Получить бесплатно
            </Button>
          </div>

          <button className="w-full mt-5 md:mt-6 text-primary hover:underline text-sm md:text-base">
            Что если я не успею вернуть заём вовремя?
          </button>
        </Card>

        <Card className="mt-8 p-8 md:p-10 shadow-xl border-0 bg-white/95 backdrop-blur hidden md:block">
          <div className="flex items-start gap-4 mb-6">
            <div className="bg-primary/10 p-3 rounded-xl">
              <Icon name="FileText" size={28} className="text-primary" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-[#1A1F2C] mb-2">
                Условия и правила использования калькулятора
              </h2>
              <p className="text-muted-foreground">
                Ознакомьтесь с важной информацией перед использованием сервиса
              </p>
            </div>
          </div>

          <div className="space-y-6 text-[#1A1F2C]/80">
            <div className="flex gap-3">
              <div className="text-primary font-bold text-xl flex-shrink-0">1.</div>
              <div>
                <h3 className="font-semibold text-lg mb-2 text-[#1A1F2C]">Расчёт является предварительным</h3>
                <p className="leading-relaxed">
                  Калькулятор показывает примерный расчёт суммы возврата. Итоговая сумма может отличаться в зависимости от выбранных условий займа и действующих акций.
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="text-primary font-bold text-xl flex-shrink-0">2.</div>
              <div>
                <h3 className="font-semibold text-lg mb-2 text-[#1A1F2C]">Новогодняя акция</h3>
                <p className="leading-relaxed">
                  Акция "Погасим заём за вас" действует до 15 января 2025 года. Участвуют все заявки, поданные в период проведения акции. Победители будут выбраны случайным образом 15 января 2025 года.
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="text-primary font-bold text-xl flex-shrink-0">3.</div>
              <div>
                <h3 className="font-semibold text-lg mb-2 text-[#1A1F2C]">Процентная ставка</h3>
                <p className="leading-relaxed">
                  Базовая процентная ставка составляет 2% за каждые 10 дней. Итоговая ставка может меняться в зависимости от кредитной истории и выбранных условий.
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="text-primary font-bold text-xl flex-shrink-0">4.</div>
              <div>
                <h3 className="font-semibold text-lg mb-2 text-[#1A1F2C]">Условия возврата</h3>
                <p className="leading-relaxed">
                  Возврат займа производится единым платежом в указанную дату. При досрочном погашении начисленные проценты пересчитываются пропорционально фактическому сроку использования займа.
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="text-primary font-bold text-xl flex-shrink-0">5.</div>
              <div>
                <h3 className="font-semibold text-lg mb-2 text-[#1A1F2C]">Возрастные ограничения</h3>
                <p className="leading-relaxed">
                  Услуга доступна гражданам РФ в возрасте от 18 до 75 лет. Для получения займа необходимо иметь постоянную регистрацию и действующий паспорт.
                </p>
              </div>
            </div>

            <div className="bg-accent/10 border-l-4 border-accent p-5 rounded-r-xl mt-6">
              <div className="flex gap-3">
                <Icon name="Info" size={24} className="text-accent flex-shrink-0" />
                <p className="text-sm leading-relaxed">
                  <strong className="text-[#1A1F2C]">Важно:</strong> Используя калькулятор, вы принимаете условия использования сервиса. Перед оформлением займа внимательно ознакомьтесь с договором и всеми условиями. Помните об ответственности за несвоевременный возврат займа.
                </p>
              </div>
            </div>
          </div>
        </Card>

        <div className="text-center mt-8 text-muted-foreground text-sm">
          <p>© 2025 Калькулятор займов. Все права защищены.</p>
        </div>
      </div>
    </div>
  );
};

export default Index;