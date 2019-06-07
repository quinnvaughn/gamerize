import React from 'react'
import styled from 'styled-components'

import NavBar from '../Components/NavBar'
import Collapsible from '../Components/Collapsible'
import useTitle from '../Hooks/useTitle'
import useEmailClick from '../Hooks/useEmailClick'

const PageContainer = styled.div`
  width: 100vw;
  max-width: 100%;
  height: 100vh;
`

const Content = styled.div`
  @media (min-width: 744px) {
    max-width: 696px;
  }
  @media (min-width: 1128px) {
    max-width: 1080px;
  }
  margin: 0 auto;
  width: auto;
  padding-right: 2.4rem;
  padding-left: 2.4rem;
  font-size: 1.6rem;
  padding-bottom: 4rem;
`

const Top = styled.div`
  padding-top: 9.6rem;
  padding-bottom: 8rem;
  border-bottom: 1px solid #dddfe2;
`

const Bottom = styled.div`
  padding-top: 9.6rem;
  padding-bottom: 8rem;
  border-bottom: 1px solid #dddfe2;
`

const FAQ = styled.div`
  font-size: 6rem;
  line-height: 6.4rem;
  letter-spacing: -2.5px;
  font-weight: 800;
  text-align: center;
  margin-bottom: 3rem;
`

const Users = styled.div`
  font-size: 2.2rem;
  margin-bottom: 1.6rem;
  font-weight: 600;
`

const Gamers = styled.div`
  font-size: 2.2rem;
  margin-bottom: 1.6rem;
  font-weight: 600;
`

const Text = styled.div`
  font-size: 1.8rem;
`

const TextContainer = styled.div`
  display: flex;
  margin-top: 2rem;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  line-height: 1.5;
`

const Link = styled.div`
  font-size: 1.8rem;
  cursor: pointer;
  :hover {
    color: #db1422;
  }
`

export default function FAQPage(props) {
  useTitle('Gamerize - Frequently Asked Questions')
  useEmailClick()
  return (
    <PageContainer>
      <NavBar />
      <Content>
        <Top>
          <FAQ>Frequently Asked Questions</FAQ>
          <Users>Users</Users>
          <Collapsible title="What is Gamerize?">
            Gamerize is a marketplace where you can pay to play video games with
            your favorite celebrities/streamers/youtubers/etc.
          </Collapsible>
          <Collapsible title="Is this a finished product?">
            Definitely not! This is merely an open alpha/beta. Gamerize will
            constantly be adding features and improving the experience for
            everyone.
          </Collapsible>
          <Collapsible title="How do I sign up?">
            Click on the Sign Up link in the navigation bar and fill out your
            information.
          </Collapsible>
          <Collapsible title="How do I edit my profile?">
            Click on your avatar in the top right corner and click on profile.
          </Collapsible>
          <Collapsible title="How do I find a session?">
            There are several ways to do this. You could start by searching for
            a particular game you like and then finding sessions through that,
            or finding a gamer you're aware of and looking through their
            sessions. Finally you could also look through all the sessions until
            you find one interesting to you.
          </Collapsible>
          <Collapsible title="How do I book a time slot?">
            Once you find the session you're interested in playing, you can
            either pick on a session in the "Today's Availability" tab, or be
            clicking on the button on the right hand side to go to the calendar.
            Once you have picked a specific slot, you can choose have many slots
            you want to book, and how many players you want to book (if you want
            to play with your friends). These will then be put in your queue,
            and you can select multiple time slots before booking.
          </Collapsible>
          <Collapsible title="Why can't I book a time slot?">
            This could be for one of several reasons. You may not have the
            appropriate gamertag set up, in which case you can add that under
            your profile page. You may not have a card set up yet to pay for the
            session, in which case you can also add that info under your profile
            page, or at checkout. The time slot might not have any more open
            slots since you put it in your queue, or it could just be your own
            session.
          </Collapsible>
          <Collapsible title="What do I do after booking?">
            If you have paid for multiple slots, first thing you'd want to do is
            send your invites to your friends. After you have sent all your
            invites, all you have to do is wait until your time slot is
            happening. We recommend getting online on whatever the platform is
            at least 5 minutes beforehand, as the gamer's previous game could
            have finished early. They already have your gamertag, so you should
            receive an invite from that gamer. Then enjoy the game!
          </Collapsible>
          <Collapsible title="Where are my invites?">
            If you booked a time slot with multiple players, your invites will
            appear under the "Sessions" tab in the navigation bar, under the
            "Invites" tab on that page. You can only send invites to users on
            your friends list, as we did not want people spamming popular people
            with requests.
          </Collapsible>
          <Collapsible title="Why can't I accept an invite?">
            If you cannot accept an invite, you must add the appropriate
            gamertag for the launcher or system the session is on.
          </Collapsible>
          <Collapsible title="How do I add a friend?">
            Simply search them by name, username or display name in the search
            bar, or get the url to their profile from them, and click the add
            friend button. You can also find people you played time slots with
            in your "Sessions" tab by username, which will link you to their
            profile. This is a two way friendship, so they must approve it
            before you can send them invites.
          </Collapsible>
          <Collapsible title="How do I pay for a time slot?">
            You must add a card to your account, either through your profile
            page, or as you checkout (a popup will appear allowing you to add
            your information). Currently if you want to add friends, you will
            just need to be paid back in real life, although we are working on
            changing that in the future.
          </Collapsible>
          <Collapsible title="How do I cancel my time slot?">
            You can cancel a time slot by going to your "Sessions" tab and
            clicking "Cancel" on the time slot you want to cancel, and you will
            be refunded in full. You cannot cancel a time slot that is going on.
            If you have friends invited, the invites will be deleted. If they
            already accepted it, the booking will be deleted for them as well.
            If you were invited and accepted an invite and you were the one to
            cancel, only the information for your gamertag will be removed, and
            the friend who invited you will be returned the invite.
          </Collapsible>
          <Collapsible title="I paid for a slot and my gamer didn't invite me. What should I do?">
            In the future, we will have a more robust system will helping deal
            with issues like this, but for now your best bet is to join our
            Discord server, go to the "#customer_support" channel and post a
            message in there, then someone will help you privately to get
            refunded.
          </Collapsible>
          <Collapsible title="I paid for a slot but was unable to make the time, and I didn't cancel it first. What should I do?">
            Unfortunately, in this situation we do not provide a refund, as you
            were taking away a slot from someone else who could have paid for
            the slot and denying the gamer a chance to make money.
          </Collapsible>
          <Collapsible title="I paid for my friend's slots as well. How do I get paid back?">
            At the moment, you have to get paid back in real life, through Venmo
            or Paypal or something else. In the future we plan on changing this
            functionality so your friends are paying for their own slots, even
            if you booked them originally.
          </Collapsible>
          <Collapsible title="Why is there a processing fee?">
            Our payment processor, Stripe, charges a small fee for each payment,
            so we include that in the total. We don't receive any of that money
            - it goes directly to them.
          </Collapsible>
          <Collapsible title="How does Gamerize make money?">
            We make money by taking a 20% transaction fee from the total of the
            booking not including processing fees. The gamer keeps the other
            80%.
          </Collapsible>
        </Top>
        <Bottom>
          <Gamers>Gamers</Gamers>
          <Collapsible title="How do I apply to be a gamer?">
            Once you've made an account, you can apply to become a gamer through
            the "Become a Gamer" link in the navigation bar. The applicaiton
            process is very simple and should take less than a minute.
          </Collapsible>
          <Collapsible title="Who can become a gamer?">
            Currently, you must be American to be a gamer on Gamerize. This is a
            feature of setting you up through Stripe, so we hope to address it
            in the future. We also expect you to have a sizeable enough
            following somewhere on the internet, whether that is Twitch,
            Youtube, Twitter, etc., as this will be the most common way for fans
            to see you're playing, and you would have a difficult time filling
            slots otherwise. However, your fans do not need to be primarily
            gamers or that is what you are popular for, as we believe many
            people are far more interested in just getting to hang out with
            someone they would not normally get the chance to hang out with. You
            also will need either a console or a PC that can run games.
          </Collapsible>
          <Collapsible title="Why should I become a gamer?">
            There are many reasons you might want to become a gamer. The first
            reason is simple - money. Conceptually, we believe this is the
            single best way to earn a consistent living playing video games. On
            an actual basis, that depends on how much you charge, how often you
            play/how many slots you have, and what percentage you fill those
            spots. Gamerize is focused on helping you maximize your revenue.
            Reason number two is because it's fun. We make it easy to play video
            games with your fans. It doesn't get much better than that. Finally,
            you could already be doing through PayPal or Patreon or some other
            place, but you want it to be easy to do. It is a logistical
            nightmare to set this up for more than a few people, and you are
            wasting minutes and money be trying to do this manually. We exist to
            help you maximize the amount you can get, and how many fans you can
            interact with, and make the whole process as painless as possible
            for both you and your fans.
          </Collapsible>
          <Collapsible title="Can I use Gamerize while I'm streaming?">
            Of course! There's nothing stopping you from making revenue from
            both streaming and Gamerize, it's really just a matter of if you
            want to or not.
          </Collapsible>
          <Collapsible title="Why should I use this over just doing it myself?">
            You're certainly free to try to schedule this out on your own, but
            it is a nightmare logistically, and you won't be able to schedule
            nearly as many games or make as much money without using a service
            like ours. While people use things like Patreon or PayPal to paywall
            this functionality, those do not come with the minute by minute
            scheduling or any other features we provide.
          </Collapsible>
          <Collapsible title="How long should I expect to wait until I find out if I got accepted?">
            This is completely variable to when we check applications and we can
            get through your various profiles on the internet. It could be
            minutes or a couple days (although that length is unlikely).
          </Collapsible>
          <Collapsible title="How will I know if I got accepted or not?">
            You will receive a notification if you have been accepted or not, or
            you will see the "Become a Gamer" link has become "Gamer Dashboard".
          </Collapsible>
          <Collapsible title="How many times can I apply?">
            As many times as you would like! We know popularity is not a static
            measurement, so just because you might not be popular enough when
            you first applied, that does not mean you will not get it a
            different time when you are more popular.
          </Collapsible>
          <Collapsible title="How do I get started as a gamer?">
            Once you're accepted, click on the "Gamer Dashboard" link. Once
            there, you will go through the onboarding process, which will
            require you to add a profile picture and optionally add a banner
            other than the default. You will be required to set up a Stripe
            account (this will change in the future, as eventually you will be
            setting up through us).
          </Collapsible>
          <Collapsible title="How do I add sessions?">
            Once your account is set up, you will be able to add sessions. To
            add sessions, go to the "Sessions" tab and click the "Create New
            Session" button, then fill out the appropriate information.
          </Collapsible>
          <Collapsible title="How do I add time slots?">
            Once you've created a session, it will appear in your "Calendar" tab
            on the right hand side. Click on the appropriate session, and then
            click on either the "Add One" or "Add Bulk" buttons. For "Add One",
            all you have to do is select the start time and date and we will
            figure out the length. For "Add Bulk", you select the time frame and
            we will figure out how many time slots can fit in it. These will
            then appear on your calendar. We will let you know if there are any
            overlap issues. The default suggested start time is set to 15
            minutes after you click on the "Add" button, although this is
            changeable.
          </Collapsible>
          <Collapsible title="The game I want to play isn't available. How do I add it?">
            Currently, that process involves us doing things on our side, so the
            easiest way is to go to our Discord server under the
            "#game_requests" channel and request the game you'd like to be able
            to play.
          </Collapsible>
          <Collapsible title="How do I know who I'm supposed to be playing with?">
            Once you fill out your time slots, your "Next Sessions" card will
            appear and display the gamertags of who you are supposed to be
            playing with. Once an actual session is underway, this same
            information will appear on your "Current Session" card. Since the
            users are required to add the appropriate gamertag before booking,
            you will not have to get this information yourself.
          </Collapsible>
          <Collapsible title="My game is going long, how do I add time?">
            As game times are very dynamic, this is a very common issue. On your
            "Current Sessions" card, there are three options: Add 1, 5 or 10
            minutes. Feel free to use these at your discretion. The users of any
            sessions pushed back by this will be notified.
          </Collapsible>
          <Collapsible title="My game is going short, should I move onto the next time slot?">
            This depends. We cover this in the onboarding process, but, if the
            game ended reasonably within the window of what it is the end time
            (say 13 minutes instead of 15), you are free to end the session and
            move onto the next one, as you should be able to see the next
            people's information. However, let's say your game only lasts 5
            minutes out of a 15 minute slot, you should play another game for
            free with the same people - you can always add time to the current
            time slot. Just don't do anything that would piss you yourself off
            as a user.
          </Collapsible>
          <Collapsible title="How do I get paid?">
            You get paid by setting up your Stripe account in the onboarding
            process. Stripe will be the one paying you and transferring funds to
            either your card or bank.
          </Collapsible>
          <Collapsible title="How do I look at my Stripe account?">
            On the "Home" tab, click on the "Log into Stripe" button.
          </Collapsible>
          <Collapsible title="How often do I get paid?">
            Two days after a booking is collected and not refunded, it will be
            available in your account, which is paid out on a daily basis.
          </Collapsible>
          <Collapsible title="What is Gamerize's fee?">
            We take a 20% commission for our services provided, leaving the 80%
            to you.
          </Collapsible>
          <TextContainer>
            <Text>Have any other questions?</Text>
            <Link
              onClick={() => (window.location = 'https://discord.gg/RVB43KF')}
            >
              Join our Discord to get them answered
            </Link>
          </TextContainer>
        </Bottom>
      </Content>
    </PageContainer>
  )
}
