"""
Put Headlines.db and OnionOrNot.csv into a single table that

Headline,   Label

Where label is one if it is fake, and zero otherwise.

"""
import sqlite3
import pandas as pd
if __name__ == '__main__':
    con = sqlite3.connect("Headlines.db")
    fakeHeadlines = pd.read_sql(
        """
        select headline.title as text
        from headline join feed f on headline.url = f.url
        where f.name in ("The Onion (Fake News)", "Babylon Bee (Fake News)")
        """, con)
    onionOrNot = pd.read_csv("OnionOrNot.csv")
    onionFake = onionOrNot.loc[onionOrNot["label"] == 1].drop(columns=['label'])
    notOnion = onionOrNot.loc[onionOrNot["label"] == 0]
    allFake = pd.concat([fakeHeadlines, onionFake])
    allFake.to_sql("fake_headlines", con, index=False, if_exists='replace')