import lineItems from '../content/test.json';
import {formatLineItems} from "./api";

test('formatLineItems function returns array of length 3 in test content for key "8b7fb0eb-caff-acbc-6511-cba98aefa690"', () => {
   const formattedLineItems = formatLineItems(lineItems);

   expect(Array.isArray(formattedLineItems["8b7fb0eb-caff-acbc-6511-cba98aefa690"]));
   expect(formattedLineItems["8b7fb0eb-caff-acbc-6511-cba98aefa690"].length).toBe(3);
});