import { date, z } from "zod";
import { PrismaClient } from "@prisma/client";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";



interface Context {
  db: PrismaClient;
}

type CalendarDate = {
  id: number;
};

// function to get the IDs for a given day
async function dateIdsForDay(ctx: Context, year: number, month: number, day: number): Promise<number[]> {
  const dateRecords: CalendarDate[] = await ctx.db.calendarDate.findMany({
    select: {
      id: true,
    },
    where: {
      day: day,
      month: month,
      year: year,
    }
  });

  return dateRecords.map((record: CalendarDate) => record.id);
}


export const priceRouter = createTRPCRouter({
    hello: publicProcedure
        .input(z.object({ text: z.string() }))
        .query(({ input }) => {
            return {
                greeting: `Hello ${input.text}`,
            };
        }),

    // get history data for a given day
    getHistoryDay: publicProcedure
        .input(z.object({ date: z.object({ day: z.number(), month: z.number(), year: z.number() }) }))
        .query(async ({ input, ctx }) => {
            return ctx.db.historicalElectricityWeather.findMany({
                where: {
                dateId: {
                    in: await dateIdsForDay(ctx, input.date.year, input.date.month, input.date.day),
                }
                },
                select: {
                dateId: true,
                price: true,
                dateData: {
                    select: {
                    dateValue: true,
                    }
                }
                }
            });
        }),

    // get forecast data for a given day
    getForecastDay: publicProcedure
        .input(z.object({ date: z.object({ day: z.number(), month: z.number(), year: z.number() }) }))
        .query(async ({ input, ctx }) => {
            return ctx.db.forecastElectricityPrice.findMany({
                where: {
                dateId: {
                    in: await dateIdsForDay(ctx, input.date.year, input.date.month, input.date.day),
                }
                },
                select: {
                dateId: true,
                price: true,
                dateData: {
                    select: {
                    dateValue: true,
                    }
                }
                }
            });
        }),



});