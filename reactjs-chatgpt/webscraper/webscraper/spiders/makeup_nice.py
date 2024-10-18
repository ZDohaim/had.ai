import scrapy

import scrapy

class MakeupNiceSpider(scrapy.Spider):
    name = "makeup_nice"
    allowed_domains = ["niceonesa.com"]
    start_urls = ["https://niceonesa.com/en/makeup"]

    def parse(self, response):
        # Select all the divs with the product container classes
        makeup_nice1 = response.css('div.p-3.rounded-sm')
        
        for makeup in makeup_nice1:
            regular_price = makeup.css('div.font-niceone-medium::text').get(default='N/A')
            
            discounted_price = makeup.css('div.text-discount-color.font-niceone-medium::text').get(default='N/A')

            name = makeup.css('.van-multi-ellipsis--l2.text-xs.leading-5::text').get(default='N/A')
            yield {
                'name': name,
                'regular_price': regular_price,
                'discounted_price': discounted_price
            }

