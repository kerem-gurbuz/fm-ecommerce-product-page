'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { addToCart } from '@/lib/redux-store/features/shopping-cart';
import { useAppDispatch } from '@/lib/redux-store/hooks';
import { cartItemSchema } from '@/lib/schemas/shopping-cart';
import type { ProductType } from '@/lib/types/product';
import { cn } from '@/lib/utils';
import { AddToCartButton } from './add-to-cart-button';
import { MinusIcon } from './minus-icon';
import { PlusIcon } from './plus-icon';

// TODO: Check the stock quantity dynamically from the backend.
const MAX_QUANTITY = 10;

const formSchema = cartItemSchema.pick({ quantity: true });

type AddToCartFormProps = {
  product: ProductType;
};

export function AddToCartForm({ product }: AddToCartFormProps) {
  const dispatch = useAppDispatch();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      quantity: 0,
    },
  });

  const decrementQuantity = () => {
    form.clearErrors('quantity');
    const currentValue = form.getValues('quantity');
    if (currentValue > 0) {
      form.setValue('quantity', currentValue - 1);
    }
  };

  const incrementQuantity = () => {
    form.clearErrors('quantity');
    const currentValue = form.getValues('quantity');
    if (currentValue < MAX_QUANTITY) {
      form.setValue('quantity', currentValue + 1);
    }
  };

  function onSubmit(values: z.infer<typeof formSchema>) {
    dispatch(addToCart({ product, quantity: values.quantity }));
    form.reset();

    // TODO: A toast component can be used here to show the success message.
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col items-center gap-4 min-[445px]:flex-row"
      >
        <FormField
          control={form.control}
          name="quantity"
          render={({ field }) => (
            <FormItem className="relative h-[56px] w-full rounded-[10px] lg:max-w-[157px]">
              <FormLabel className="sr-only">Quantity</FormLabel>
              <Button
                type="button"
                aria-label="Decrement quantity"
                className="absolute left-6 top-1/2 -translate-y-1/2"
                onClick={decrementQuantity}
                disabled={field.value === 0}
              >
                <MinusIcon width={12} height={3.33} />
              </Button>
              <FormControl>
                <Input
                  {...field}
                  type="number"
                  className={cn(
                    'h-full rounded-[10px] border-none bg-pale-sky text-center text-[16px] font-bold leading-[19.84px] text-very-dark-blue transition-all duration-300 [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none',
                    {
                      'focus-visible:ring-destructive':
                        form.formState.errors.quantity,
                    },
                  )}
                  min={0}
                  max={MAX_QUANTITY}
                  onChange={(e) => {
                    const value = parseInt(e.target.value);
                    if (!isNaN(value) && value >= 0 && value <= MAX_QUANTITY) {
                      field.onChange(value);
                    }
                  }}
                />
              </FormControl>
              <Button
                type="button"
                aria-label="Increment quantity"
                className="absolute right-6 top-1/2 -translate-y-1/2"
                onClick={incrementQuantity}
                disabled={field.value === MAX_QUANTITY}
              >
                <PlusIcon width={12} height={12} />
              </Button>
              <FormMessage className="absolute left-0 top-[144px] text-nowrap text-base font-bold min-[445px]:top-[72px]" />
            </FormItem>
          )}
        />
        <AddToCartButton />
      </form>
    </Form>
  );
}
