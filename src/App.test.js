import React from 'react';
import App from './App';
import { render, fireEvent, cleanup } from '@testing-library/react';

import '@testing-library/jest-dom/extend-expect';

const renderApp = () => render(<App />);

afterEach(() => {
  cleanup()
});

beforeEach(() => {
  const {
    getByText, getByTestId, queryByText, queryByTestId, container, asFragment
  } = renderApp();
})

test('should create the Teams and Channels listing app which contains the teams', () => {
  expect(document.querySelectorAll('.team-name')[0].innerHTML).toBe("Team1");
});

test('teams and channel list should display first team by default along with required inputs and button', () => {
  const teamName = document.querySelector('.team-name');
  const channelSortButton = document.querySelector('.sort');
  const addChannelInput = document.querySelector('.add-channel input');
  const addChannelButton = document.querySelector('.add-channel button');
  expect(teamName).toBeTruthy();
  expect(teamName.innerHTML).toBe("Team1");
  expect(channelSortButton).toBeTruthy();
  expect(channelSortButton.disabled).toBe(false);
  expect(addChannelInput).toBeTruthy();
  expect(addChannelButton).toBeTruthy();
  expect(addChannelButton.disabled).toBe(true);
});

test('teams and channel list should display first channel in team by default along with required buttons', () => {
  const channelName = document.querySelector('.channel-name span');
  const channelRemoveButton = document.querySelector('.channel-name button');
  expect(channelName).toBeTruthy();
  expect(channelName.innerHTML).toBe('Channel1');
  expect(channelRemoveButton).toBeTruthy();
  expect(channelRemoveButton.disabled).toBeFalsy();
});

test('Add Team section should exist and add button should be disabled initially', () => {
  const addTeam = document.querySelector('.add-team b');
  const addTeamButton = document.querySelector('.add-team button');
  expect(addTeam).toBeTruthy();
  expect(addTeam.innerHTML).toBe("Add Team");
  expect(addTeamButton.disabled).toBe(true);
});

test('Add Team button should not be enabled if data entered in input is empty or numeric', () => {
  const addTeamInput = document.querySelector('.add-team input');
  const addTeamButton = document.querySelector('.add-team button');
  fireEvent.input(addTeamInput, {
    target: { value: ''}
  });
  expect(addTeamButton.disabled).toBe(true);
  fireEvent.input(addTeamInput, {
    target: { value: 1234}
  });
  expect(addTeamButton.disabled).toBe(true);
});

test('Add Team button should be enabled if data entered in input is correct and clicking on button should add it to the list of teams', () => {
  const addTeamInput = document.querySelector('.add-team input');
  const addTeamButton = document.querySelector('.add-team button');
  fireEvent.input(addTeamInput, {
    target: { value: 'Team3'}
  });
  expect(addTeamButton.disabled).toBe(false);
  fireEvent.click(addTeamButton);
  const teamNames = document.querySelectorAll('.team-name');
  expect(teamNames[2].innerHTML).toBe("Team3");
});

test('it should display correct channels name along with remove button', () => {
  const channelName = document.querySelectorAll('.channel-name span');
  const channelRemoveButton = document.querySelectorAll('.channel-name button');
  expect(channelName).toBeTruthy();
  expect(channelName[0].innerHTML).toBe('Channel1');
  expect(channelName[1].innerHTML).toBe('Channel2');
  expect(channelRemoveButton).toBeTruthy();
  expect(channelRemoveButton[0].disabled).toBeFalsy();
  expect(channelRemoveButton[1].disabled).toBeFalsy();
});

test('Add Channel button should exist and should be disabled initially', () => {
  const addChannelButton = document.querySelector('.add-channel button');
  expect(addChannelButton.disabled).toBe(true);
});

test('Add Channel button should not be enabled if data entered in input is empty or numeric', () => {
  const addChannelInput = document.querySelector('.add-channel input');
  const addChannelButton = document.querySelector('.add-channel button');
  fireEvent.input(addChannelInput, {
    target: { value: ''}
  });
  expect(addChannelButton.disabled).toBe(true);
  fireEvent.input(addChannelInput, {
    target: { value: 1234}
  });
  expect(addChannelButton.disabled).toBe(true);
});

test('Add Channel button should be enabled if data entered in input is correct and clicking on button should add the channel to the existing list', () => {
  const addChannelInput = document.querySelector('.add-channel input');
  const addChannelButton = document.querySelector('.add-channel button');
  fireEvent.input(addChannelInput, {
    target: { value: 'Channel3'}
  });
  expect(addChannelButton.disabled).toBe(false);
  fireEvent.click(addChannelButton);
  const channelNames = document.querySelectorAll('.channel-name span');
  expect(channelNames[0].innerHTML).toBe("Channel1");
  expect(channelNames[1].innerHTML).toBe("Channel2");
  expect(channelNames[2].innerHTML).toBe("Channel3");
});

test('Clicking on remove button should remove the channel from the list', () => {
  const channelRemoveButton = document.querySelectorAll('.channel-name button');
  fireEvent.click(channelRemoveButton[0]);
  const channelNames = document.querySelectorAll('.channel-name span');
  expect(channelNames.length).toBe(3);
  expect(channelNames[0].innerHTML).toBe("Channel2");
  expect(channelNames[1].innerHTML).toBe("Channel1");
  expect(channelNames[2].innerHTML).toBe("Channel2");
});

test('Clicking on sort button once list the channels in ascending order of names', () => {
  const addChannelInput = document.querySelector('.add-channel input');
  const addChannelButton = document.querySelector('.add-channel button');
  fireEvent.input(addChannelInput, {
    target: { value: 'Channel0'}
  });
  expect(addChannelButton.disabled).toBe(false);
  fireEvent.click(addChannelButton);
  const channelSortButton = document.querySelector('.sort');
  channelSortButton.click();
  const channelNames = document.querySelectorAll('.channel-name span');
  expect(channelNames[0].innerHTML).toBe("Channel0");
  expect(channelNames[1].innerHTML).toBe("Channel1");
  expect(channelNames[2].innerHTML).toBe("Channel2");
});

it('Clicking on sort button twice list the channels in descending order of names', () => {
  const addChannelInput = document.querySelector('.add-channel input');
  const addChannelButton = document.querySelector('.add-channel button');
  fireEvent.input(addChannelInput, {
    target: { value: 'Channel0'}
  });
  expect(addChannelButton.disabled).toBe(false);
  fireEvent.click(addChannelButton);
  const channelSortButton = document.querySelector('.sort');
  channelSortButton.click();
  channelSortButton.click();
  const channelNames = document.querySelectorAll('.channel-name span');
  expect(channelNames[0].innerHTML).toBe("Channel2");
  expect(channelNames[1].innerHTML).toBe("Channel1");
  expect(channelNames[2].innerHTML).toBe("Channel0");
});

it('Clicking on sort button thrice list the channels according to creation order', () => {
  const addChannelInput = document.querySelector('.add-channel input');
  const addChannelButton = document.querySelector('.add-channel button');
  fireEvent.input(addChannelInput, {
    target: { value: 'Channel0'}
  });
  expect(addChannelButton.disabled).toBe(false);
  fireEvent.click(addChannelButton);
  const channelSortButton = document.querySelector('.sort');
  channelSortButton.click();
  channelSortButton.click();
  channelSortButton.click();
  const channelNames = document.querySelectorAll('.channel-name span');
  expect(channelNames[0].innerHTML).toBe("Channel1");
  expect(channelNames[1].innerHTML).toBe("Channel2");
  expect(channelNames[2].innerHTML).toBe("Channel0");
});