import Knex from 'knex';

export async function seed(knex: Knex) {
  await knex('items').insert([
    { title: 'Light Bulbs', image: 'light_bulb.svg' },
    { title: 'Batteries',    image: 'battery.svg' },
    { title: 'Papers',      image: 'papers.svg' },
    { title: 'Electronics', image: 'electronics.svg' },
    { title: 'Organics',    image: 'organics.svg' },
    { title: 'Oils',        image: 'oils.svg' },
  ]);
}